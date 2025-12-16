# TouristAI Project

TouristAI is a comprehensive travel assistant for Lagos, Nigeria, combining a curated directory of attractions with an AI-powered guide capable of answering specific questions.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: FastAPI + LangChain + OpenAI
- **Database**: Supabase (PostgreSQL)
- **Vector Store**: FAISS
- **LLM**: Natlas (hosted on Kaggle via Ngrok) 

## Project Structure

- **touristai/**: The Frontend application (React + Vite).
- **rag/**: The Backend API (FastAPI + LangChain + FAISS).
- **supabase_schema.sql**: Database schema for Supabase.

## Quick Start

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Supabase account
- OpenAI API key

### 1. Database Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase_schema.sql`
3. Populate the `places` table with your tourist data

### 2. Backend Setup
Navigate to the `rag` directory:
```bash
cd rag
python -m venv venv
# Activate venv (Windows: venv\Scripts\activate, Mac/Linux: source venv/bin/activate)
pip install -r requirements.txt
```

Create a `.env` file in the `rag` directory:
```env
OPENAI_API_KEY=your_openai_key
```

Start the backend:
```bash
uvicorn main:app --reload --port 5000
```

### 3. Frontend Setup
Navigate to the `touristai` directory:
```bash
cd touristai
npm install
```

Create a `.env` file (see `.env.example`):
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the frontend:
```bash
npm run dev
```

Visit `http://localhost:5173` to use the app.

## Features
- **AI-Powered Recommendations**: Natural language queries powered by RAG
- **Real-time Data**: Supabase for dynamic content management
- **Responsive UI**: Premium design with glassmorphism and smooth animations
- **Custom LLM Integration**: Support for self-hosted models via Ngrok
