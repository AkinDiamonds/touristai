# for llama nodes
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.schema import Document as LlamaDocument

# for metadata
import re

# for langchain
from langchain_community.docstore.document import Document
# for langchain
from langchain_community.docstore.document import Document
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser



# for embeddingss
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# for natlas
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace

from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from langchain_huggingface import HuggingFacePipeline

# trying my best
import torch



# for env
import os
from dotenv import load_dotenv

load_dotenv()

# api key openai
openai_api_key = os.getenv("OPENAI_API_KEY")

# api key natlas
natlas_api_key = os.getenv("NATLAS_API_KEY")
os.environ["HUGGING_FACE_HUB_TOKEN"] = natlas_api_key


with open("Cleaned_Tourist.txt", "r", encoding="utf-8") as f:
    main_doc = f.read()

# main_doc_llama = LlamaDocument(text=main_doc)

# splitter = SentenceSplitter(
#     chunk_size=700,
#     chunk_overlap=120,
# )

# chunks = splitter.get_nodes_from_documents([main_doc_llama])

# metadata

def extract_name(text):
    match = re.search(r"^Name:\s*(.+)$", text, re.MULTILINE)
    return match.group(1).strip() if match else "unknown"



def extract_area(text):
    # capture after the header until a newline or 'Description:' or 'Name:' or end
    match = re.search(r"State\s*/\s*City\s*/\s*LGA:\s*([^\n\r]*?)(?=\s*Description:|\s*Name:|\n|$)", text, flags=re.IGNORECASE)
    return match.group(1).strip() if match else "unknown"

def infer_category(text):
    name = extract_name(text).lower()

    if "beach" in name:
        return "beach"
    if "museum" in name:
        return "museum"
    if "gallery" in name or "art" in name or "theatre" in name:
        return "cultural"
    if "park" in name or "conservation" in name:
        return "park"

    return "general"


# split by entity
raw_entities = main_doc.split("________________")

chunks = []
for e in raw_entities:
    e = e.strip()
    if not e:
        continue

    node = LlamaDocument(text=e)
    node.metadata = {
        "name": extract_name(e),
        "area": extract_area(e),
        "category": infer_category(e),
    }
    chunks.append(node)

# print(chunks[0].text)



# convertin to langchain document
lc_docs = [
    Document(
        page_content=node.text,
        metadata=node.metadata
    )
    for node in chunks
]

# embed


embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)

vectorstore = Chroma.from_documents(
    lc_docs,
    embeddings,
    collection_name="touristai",
    persist_directory="./chroma_db"
)

retriever = vectorstore.as_retriever(
    search_kwargs={
        "k": 5,
    }
)

docs = retriever.invoke({input})

# for d in docs:
#     print(d.metadata)
#     print(d.page_content[:200])
#     print("----")

# trying my best
model_name = "NCAIR1/N-ATLaS"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16,
    device_map="auto"
)



pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=512,
    temperature=0.2,
)

llm = HuggingFacePipeline(pipeline=pipe)




prompt = PromptTemplate.from_template("""
Answer the following question based only on the provided context:

Context:
{context}

Question: {input}
""")

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "input": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)



query = "Best beach to visit in Lagos with kids?"
response = rag_chain.invoke(query)
print("\n Question:", query)
print(" Answer:", response)





