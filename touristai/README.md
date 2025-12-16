# TouristAI Frontend

This is the frontend client for the TouristAI application, built with React and Vite. It provides an interactive interface for users to explore curated tourist spots in Lagos and chat with the AI guide.

## Features
- **Interactive Map & Lists**: Browse top-rated locations.
- **AI Chat Panel**: Ask questions and get real-time recommendations.
- **Responsive Design**: Optimized for mobile and desktop.
- **Supabase Integration**: Real-time data fetching from PostgreSQL database.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Supabase
Create a `.env` file in this directory (copy from `.env.example`):
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under API.

### 3. Database Setup
Before running the app, ensure your Supabase database is set up:
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the schema from `../supabase_schema.sql`
4. Populate your database with places data

## Running Locally

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.
Make sure the Backend RAG API is running on port 5000 for the Chat feature to work.

## Project Structure
```
src/
├── components/        # React components
│   ├── AIpanel.jsx   # Main page with places grid
│   ├── PlaceDetails.jsx
│   └── Sidebar.jsx
├── services/         # API service layer
│   └── placesService.js
├── lib/              # Utilities
│   └── supabaseClient.js
└── data/             # (Legacy) Static data - now using Supabase
```
