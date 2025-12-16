# TouristAI RAG Backend

This directory contains the FastAPI backend for the TouristAI application. It leverages a RAG (Retrieval-Augmented Generation) pipeline to answer user queries about tourist destinations in Lagos.

## Architecture
- **Framework**: FastAPI
- **LLM**: Custom Natlas LLM hosted on Kaggle (accessed via Ngrok) / OpenAI (fallback)
- **Vector Store**: FAISS
- **Embeddings**: OpenAI Embeddings

## Setup

1.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    ```

2.  **Activate the virtual environment:**
    - Windows: `venv\Scripts\activate`
    - Mac/Linux: `source venv/bin/activate`

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Environment Variables:**
    Create a `.env` file in this directory and add your keys:
    ```env
    OPENAI_API_KEY=your_openai_key
    ```

## Running the Server

Start the API server:
```bash
uvicorn main:app --reload --port 5000
```

The API will be available at `http://localhost:5000`.
RAG Query Endpoint: `POST /query`
