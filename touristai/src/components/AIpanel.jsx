import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import bgImage from "../assets/africa.png";

function AIpanel() {
  const [isAIMode, setIsAIMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.focusInput) {
      setIsAIMode(true);
      // Ideally we'd set the input value too if we controlled it via state, 
      // but current input is uncontrolled onKeyDown. 
      // Let's just log for now or we could refactor input to be controlled.
      console.log("Returned from details with query:", location.state.query);
    }
  }, [location]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      if (isAIMode) {
        console.log("Sending to Toyeebah:", query);
      } else {
        console.log("Fetching from Olamide:", query);
      }
    }
  };

  return (
    <div
      className="
    flex-1 h-full pt-40 overflow-y-auto p-10 relative
  "
    >
      {/* Overlay for better readability if needed, or just container */}
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] space-y-12 relative z-10">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-6xl font-extrabold text-[#3E2723] tracking-tight drop-shadow-sm" style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.8), -1px -1px 2px rgba(0,0,0,0.1)" }}>
            TouristAI
          </h1>
          <p className="text-xl md:text-2xl font-medium text-[#5D4037] opacity-90 max-w-2xl mx-auto leading-relaxed">
            Your reliable guide to the heart of Lagos.
          </p>
        </div>

        {/* AI Query Input */}
        <div className="w-full max-w-3xl relative group">
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
            placeholder={isAIMode ? "Ask your Tourist AI..." : "Search places in Lagos..."}
            onKeyDown={handleSearch}
            className="w-full bg-[#FFFFFF]/80 backdrop-blur-md border-2 border-[#5D4037]/30 rounded-2xl p-6 text-xl text-[#3E2723] placeholder-[#8D6E63] shadow-xl focus:outline-none focus:border-[#3E2723] focus:ring-4 focus:ring-[#3E2723]/10 transition-all text-center font-serif"
          />
        </div>

        {/* Suggestions */}
        <div className="w-full max-w-3xl mt-16 pb-20 mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#3E2723] border-b-2 border-[#5D4037]/20 pb-4 inline-block mx-auto w-full max-w-xs">
            Recommended Places
          </h2>

          {/* Recommended First */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {dummyCards.map((p) => (
              <Link to={`/place/${p.title.replace(/ /g, "-")}`} key={p.title} className="block group">
                <div
                  className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-[#5D4037]/10 bg-[#FAF3E0]"
                >
                  <div className="h-48 bg-[#D7CCC8] group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#3E2723] mb-1 group-hover:text-[#BF360C] transition-colors">{p.title}</h3>
                    <p className="text-lg text-[#5D4037] font-medium opacity-80">{p.type}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Categories */}
          {categorySections.map((section) => (
            <div key={section.title} id={section.title} className="mb-16 scroll-mt-10">
              <h3 className="text-2xl font-bold mb-6 text-[#5D4037] flex items-center justify-center">
                <span className="w-8 h-1 bg-[#BF360C] mr-4 rounded-full"></span>
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.cards.map((card) => (
                  <Link to={`/place/${card.title.replace(/ /g, "-")}`} key={card.title} className="block group">
                    <div
                      className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#5D4037]/10 bg-white/80 backdrop-blur-sm"
                    >
                      <div className="h-40 bg-[#EFEBE9] group-hover:scale-105 transition-transform duration-500" />
                      <div className="p-5">
                        <h4 className="text-xl font-bold text-[#3E2723] mb-1">{card.title}</h4>
                        <p className="text-md text-[#5D4037] opacity-70">{card.type}</p>
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

const dummyCards = [
  { title: "Nike Art Gallery", type: "Museum" },
  { title: "Elegushi Beach", type: "Beach" },
  { title: "Yellow Chilli", type: "Restaurant" },
  { title: "Freedom Park", type: "Attraction" },
];

const categorySections = [
  {
    title: "Eat & Drink",
    cards: [
      { title: "RSVP Lagos", type: "Fine Dining" },
      { title: "Danfo Bistro", type: "Casual Dining" },
      { title: "Hard Rock Cafe", type: "Bar & Grill" },
      { title: "Terra Kulture Food Court", type: "African Cuisine" },
    ],
  },
  {
    title: "Attractions",
    cards: [
      { title: "Lekki Conservation Centre", type: "Nature Reserve" },
      { title: "National Museum", type: "Museum" },
      { title: "Kalakuta Republic Museum", type: "History" },
      { title: "Tarkwa Bay", type: "Beach & Surf" },
    ],
  },
  {
    title: "Events & Nightlife",
    cards: [
      { title: "Quilox", type: "Nightclub" },
      { title: "Moist Beach Club", type: "Beach Club" },
      { title: "New Afrika Shrine", type: "Live Music" },
      { title: "Filmhouse IMAX", type: "Cinema" },
    ],
  },
  {
    title: "Nature & Parks",
    cards: [
      { title: "Lufasi Park", type: "Park" },
      { title: "Jhalobia Recreation Park", type: "Garden" },
      { title: "Dr. Lely's Park", type: "Picnic" },
      { title: "Ndubuisi Kanu Park", type: "Public Park" },
    ],
  },
];

export default AIpanel;