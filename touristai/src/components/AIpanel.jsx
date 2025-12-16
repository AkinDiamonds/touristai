

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchPlaces, fetchPlacesByCategory } from "../services/placesService";

function AIpanel() {
  const [isAIMode, setIsAIMode] = useState(true);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const inputRef = useRef(null);

  // State for places data
  const [allPlaces, setAllPlaces] = useState([]);
  const [recommendedPlaces, setRecommendedPlaces] = useState([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(true);

  useEffect(() => {
    if (location.state?.focusInput) {
      setIsAIMode(true);
      console.log("Returned from details with query:", location.state.query);
    }
  }, [location]);

  // Fetch places from Supabase
  useEffect(() => {
    const loadPlaces = async () => {
      setIsLoadingPlaces(true);
      try {
        const placesData = await fetchPlaces();
        setAllPlaces(placesData);

        // Filter recommended places
        const recommended = placesData.filter(p => p.category === "Recommended");
        setRecommendedPlaces(recommended);
      } catch (error) {
        console.error("Error loading places:", error);
      } finally {
        setIsLoadingPlaces(false);
      }
    };

    loadPlaces();
  }, []);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      const searchQuery = e.target.value;
      if (!searchQuery.trim()) return;

      if (isAIMode) {
        setQuery(searchQuery);
        setIsLoading(true);
        setIsExpanded(true);
        setAnswer("");

        try {
          const response = await fetch("http://127.0.0.1:5000/query", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: searchQuery }),
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const data = await response.json();
          setAnswer(data.answer);
        } catch (error) {
          console.error("Error fetching from AI:", error);
          setAnswer("Sorry, I encountered an error processing your request. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("Fetching from Olamide:", searchQuery);
      }
    }
  };

  // Helper function to get places by category from state
  const getPlacesByCategoryFromState = (category) => {
    return allPlaces.filter(p => p.category === category);
  };

  const categories = ["Eat & Drink", "Attractions", "Events & Nightlife", "Nature & Parks"];

  return (
    <div className="flex-1 h-full pt-40 overflow-y-auto p-10 relative">
      {/* Overlay  */}
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] space-y-12 relative z-10">

        {/* Header Section */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-extrabold text-[#3E2723] tracking-tight drop-shadow-sm" style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.8), -1px -1px 2px rgba(0,0,0,0.1)" }}>
            TouristAI
          </h1>
          <p className="text-xl md:text-2xl font-medium text-[#5D4037] opacity-90 max-w-2xl mx-auto leading-relaxed">
            Your reliable guide to the heart of Lagos.
          </p>
        </div>

        {/* AI input */}
        <div className="w-full max-w-3xl relative group mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-[#5D4037]/10 backdrop-blur-sm p-1.5 rounded-2xl inline-flex border border-[#5D4037]/20">
              <button
                onClick={() => setIsAIMode(true)}
                className={`relative cursor-pointer px-2 py-1 rounded-xl text-sm font-bold transition-all duration-300 ${isAIMode ? "bg-[#3E2723] text-[#F5F5F5] shadow-lg" : "text-[#5D4037] hover:bg-[#5D4037]/10"
                  }`}
              >
                AI Guide
              </button>
              <button
                onClick={() => setIsAIMode(false)}
                className={`cursor-pointer px-2 py-1 rounded-xl text-sm font-bold transition-all duration-300 ${!isAIMode ? "bg-[#3E2723] text-[#F5F5F5] shadow-lg" : "text-[#5D4037] hover:bg-[#5D4037]/10"
                  }`}
              >
                Search
              </button>
            </div>
          </div>

          <input
            ref={inputRef}
            placeholder={isAIMode ? "Ask your Tourist AI..." : "Search places in Lagos..."}
            onKeyDown={handleSearch}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#FFFFFF]/80 backdrop-blur-md border-2 border-[#5D4037]/30 rounded-2xl p-6 text-xl text-[#3E2723] placeholder-[#8D6E63] shadow-xl focus:outline-none focus:border-[#3E2723] focus:ring-4 focus:ring-[#3E2723]/10 transition-all text-center font-serif"
          />

          {/* Answer Panel: using custom css here. i think it's better for smooth scroll */}
          {isExpanded && (
            <div className="mt-4 w-full">
              <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(93, 64, 55, 0.05);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: linear-gradient(180deg, #BF360C 0%, #3E2723 100%);
                  border-radius: 10px;
                  border: 2px solid rgba(255, 255, 255, 0.1);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(180deg, #D84315 0%, #5D4037 100%);
                }
                @keyframes slideDown {
                  from {
                    opacity: 0;
                    transform: translateY(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                .slide-down {
                  animation: slideDown 0.3s ease-out;
                }
              `}</style>

              <div className="relative slide-down">
                {/* Header */}
                <div className="flex items-center justify-between mb-2 px-2">
                  <span className="text-sm font-semibold text-[#3E2723] opacity-70">
                    AI Response
                  </span>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-[#5D4037] hover:text-[#BF360C] transition-colors p-1 rounded-full hover:bg-[#5D4037]/10"
                    aria-label="Close answer panel"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Answer Panel */}
                <div className="relative backdrop-blur-xl bg-white/60 border-2 border-[#5D4037]/20 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="max-h-96 overflow-y-auto custom-scrollbar p-6">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="relative w-16 h-16">
                          <div className="absolute top-0 left-0 w-full h-full border-4 border-[#BF360C]/20 rounded-full"></div>
                          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#BF360C] rounded-full animate-spin"></div>
                        </div>
                        <p className="text-[#5D4037] font-medium animate-pulse">Thinking...</p>
                      </div>
                    ) : (
                      <div className="prose prose-lg max-w-none">
                        <p className="text-[#3E2723] leading-relaxed whitespace-pre-wrap font-serif text-lg">
                          {answer}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Decorative gradient overlay at bottom */}
                  {!isLoading && answer && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/40 to-transparent pointer-events-none"></div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="w-full mt-16 pb-20 mx-auto px-4 md:px-0">

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#3E2723] border-b-2 border-[#5D4037]/20 pb-4 inline-block mx-auto w-full max-w-xs">
              Recommended Places
            </h2>

            {/* Recommended First */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
              {recommendedPlaces.map((p) => (
                <Link to={`/place/${p.id}`} key={p.id} className="block group">
                  <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-[#5D4037]/10 bg-[#FAF3E0]">
                    <div className="h-48 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-[#3E2723] mb-1 group-hover:text-[#BF360C] transition-colors">{p.title}</h3>
                      <p className="text-lg text-[#5D4037] font-medium opacity-80">{p.type}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          {categories.map((category) => (
            <div key={category} id={category} className="mb-16 scroll-mt-10 w-full max-w-6xl mx-auto">
              <h3 className="text-4xl font-bold mb-6 border-b-6 border-[#BF360C] text-[#5D4037] flex items-left justify-left">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {getPlacesByCategoryFromState(category).map((card) => (
                  <Link to={`/place/${card.id}`} key={card.id} className="block group">
                    <div className="relative h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#5D4037]/10 bg-white/80 backdrop-blur-sm flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-[#3E2723] mb-1">{card.title}</h4>
                          <p className="text-md text-[#5D4037] opacity-70">{card.type}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default AIpanel;
