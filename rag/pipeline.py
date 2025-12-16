# for llama nodes
import sys
# Mock transformers to avoid slow import on Windows/Python3.14
sys.modules["transformers"] = None

from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.schema import Document as LlamaDocument

# for metadata
import re
import os
import requests # <--- New import for calling the API
from typing import Any, List, Optional # <--- Type hints for Custom LLM

# for langchain
from langchain_community.docstore.document import Document
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.language_models.llms import LLM # <--- Import base LLM class
from langchain_core.callbacks.manager import CallbackManagerForLLMRun

# for embeddings
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS  # Using FAISS instead of Chroma

# for env
from dotenv import load_dotenv

load_dotenv()

# api key openai
openai_api_key = os.getenv("OPENAI_API_KEY")

# SETUP DOCUMENTS & RETRIEVER 

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SOURCE_DOC_PATH = os.path.join(BASE_DIR, "Cleaned_Tourist.txt")
VECTOR_STORE_PATH = os.path.join(BASE_DIR, "faiss_index")

with open(SOURCE_DOC_PATH, "r", encoding="utf-8") as f:
    main_doc = f.read()

def extract_name(text):
    match = re.search(r"^Name:\s*(.+)$", text, re.MULTILINE)
    return match.group(1).strip() if match else "unknown"

def extract_area(text):
    match = re.search(r"State\s*/\s*City\s*/\s*LGA:\s*([^\n\r]*?)(?=\s*Description:|\s*Name:|\n|$)", text, flags=re.IGNORECASE)
    return match.group(1).strip() if match else "unknown"

def infer_category(text):
    name = extract_name(text).lower()
    if "beach" in name: return "beach"
    if "museum" in name: return "museum"
    if "gallery" in name or "art" in name or "theatre" in name: return "cultural"
    if "park" in name or "conservation" in name: return "park"
    return "general"

# split by entity
raw_entities = main_doc.split("________________")

chunks = []
for e in raw_entities:
    e = e.strip()
    if not e: continue

    node = LlamaDocument(text=e)
    node.metadata = {
        "name": extract_name(e),
        "area": extract_area(e),
        "category": infer_category(e),
    }
    chunks.append(node)

# convert to langchain document
lc_docs = [
    Document(
        page_content=node.text,
        metadata=node.metadata
    )
    for node in chunks
]

# embed
print("Initializing OpenAI Embeddings...")
embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)

if os.path.exists(VECTOR_STORE_PATH):
    print("Loading existing Vector Store...")
    vectorstore = FAISS.load_local(VECTOR_STORE_PATH, embeddings, allow_dangerous_deserialization=True)
else:
    print("Creating Vector Store with FAISS...")
    vectorstore = FAISS.from_documents(lc_docs, embeddings)
    # Save for later use
    vectorstore.save_local(VECTOR_STORE_PATH)
    print("Vector Store created and saved.")

retriever = vectorstore.as_retriever(
    search_kwargs={"k": 5}
)

#  CUSTOM KAGGLE LLM WRAPPER

class KaggleServerLLM(LLM):
    """
    Custom LLM that sends prompts to the Kaggle/Ngrok endpoint.
    """
    endpoint_url: str
    
    @property
    def _llm_type(self) -> str:
        return "kaggle_server"

    def _call(
        self,
        prompt: str,
        stop: Optional[List[str]] = None,
        run_manager: Optional[CallbackManagerForLLMRun] = None,
        **kwargs: Any,
    ) -> str:
        """Execute the API call."""
        
        # Payload
        payload = {
            "prompt": prompt,
            "max_new_tokens": 512,
            "temperature": 1, 
           
        }

        try:
            response = requests.post(self.endpoint_url, json=payload)
            response.raise_for_status()
            result_json = response.json()
            
            # Extract text from server response
            generated_text = result_json.get("generated_text", "")

        
            if generated_text.startswith(prompt):
                final_answer = generated_text[len(prompt):]
            else:
                final_answer = generated_text
                
            return final_answer.strip()

        except Exception as e:
            return f"Error contacting model server: {e}"

# INITIALIZE PIPELINE



ngrok_url = "https://caryn-lobate-janee.ngrok-free.dev/predict"
llm = KaggleServerLLM(endpoint_url=ngrok_url)

prompt_template = PromptTemplate.from_template("""
You are a friendly and knowledgeable tourist guide.

Your personality:
- Warm, welcoming, and easy to understand
- Speaks clearly, like guiding a visitor for the first time
- Helpful and honest, never overconfident

Knowled
 rules:
- Answer the question using ONLY the information in the provided context.
- Do not add facts, history, or details that are not in the context.
- If the context does not include the information needed, say so politely (for example: "That information is not available here.")
- Not more than 5 sentences.


Language rules:
- Respond in the same language as the user's question.
- If the user specifies a preferred language, use that language.
- Do not mix languages in a single response.
- If you cannot respond clearly in the requested language using the provided context, say so politely in that language.

Context:
{context}

Question:
{input}

Respond like a tourist guide helping a visitor.
""")


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "input": RunnablePassthrough()}
    | prompt_template
    | llm
    | StrOutputParser()
)



