from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pipeline import rag_chain

app = FastAPI(title="Tourist RAG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],  
)

class QueryRequest(BaseModel):
    question: str

@app.post("/query")
def query_rag(request: QueryRequest):
    """Return answer for a given question."""
    # The rag_chain expects a string input, not a dictiionary
    answer = rag_chain.invoke(request.question)
    return {
        "question": request.question,
        "answer": answer
    }

@app.get("/")
def root():
    return {"message": "RAG API running. POST to /query with your question."}
