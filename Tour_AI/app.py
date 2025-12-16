from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import supabase

app = FastAPI(title="TourGuide AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/events")
def get_events(month: str | None = Query(None, description="Filter events by month")):
    try:
        query = supabase.table("events").select("*")
   
        if month:
        # to get based on searched month
            query = query.eq("month", month)
    
        response = query.execute()
        return{
            "data": response.data
        }
    
    except Exception as e:
        raise HTTPException(status_code=501, detail=str(e))
    


@app.get("/attractions")
def get_attractions(
    city: str | None = Query(None, description="Filter by city"),
    category: str | None = Query(None, description="Filter by category")
):
    try:
        query = supabase.table("attractions").select("*")
        #search based on city    
        if city:
            query = query.eq("city", city)
        #search based on category
        if category:
            query = query.eq("category", category)
    
        response = query.execute()
        return {
            "data": response.data
        }

    except Exception as e:
        raise HTTPException(status_code=501, detail=str(e))
    
   

