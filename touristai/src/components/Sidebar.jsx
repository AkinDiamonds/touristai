import { useState } from "react";
import { Utensils, MapPin, Ticket, Trees, ChevronRight, ChevronLeft } from "lucide-react";

function Sidebar() {
  const [openCategory, setOpenCategory] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const categories = [
    {
      name: "Eat & Drink",
      icon: <Utensils size={24} />,
      items: ["Restaurants", "Local Eateries", "Lounges"],
    },
    {
      name: "Attractions",
      icon: <MapPin size={24} />,
      items: ["Museums", "Landmarks", "Theme Parks"],
    },
    {
      name: "Events & Nightlife",
      icon: <Ticket size={24} />,
      items: ["Parties", "Live Music", "Festivals"],
    },
    {
      name: "Nature & Parks",
      icon: <Trees size={24} />,
      items: ["Beaches", "Waterfalls", "Reserves"],
    },
  ];

  const toggle = (name) => {
    if (isCollapsed) return;
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  return (
    <div
      className={`${isCollapsed ? "w-24 px-4" : "w-[350px] p-8"
        } h-full bg-[#3e2723] rounded-r-2xl text-white flex flex-col justify-between z-10 transition-all duration-300 ease-in-out relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-[#BF360C] p-1.5 rounded-full shadow-lg hover:bg-[#D84315] transition-colors z-50 cursor-pointer"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <div>
        {/* Header */}
        <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? "opacity-0 h-0 my-0" : "opacity-100 h-auto mt-4 mb-12"}`}>
          <div className="text-3xl font-bold text-[#BF360C] border-b-2 border-[#5D4037]/50 pb-4 inline-block mx-auto w-full max-w-xs whitespace-nowrap">
            What do you need?
          </div>
        </div>

        {/* Logo/Icon when collapsed for top spacing */}
        {isCollapsed && <div className="h-20 mb-10 flex items-center justify-center text-[#BF360C] font-bold">FIND</div>}

        {categories.map((cat) => (
          <div key={cat.name} className={`${isCollapsed ? "mb-8" : "mb-14"} flex flex-col items-left`}>
            {/* Main categories */}
            <div
              onClick={() => {
                if (isCollapsed) {
                  setIsCollapsed(false);
                  // allow expansion anim to start before scrolling
                  setTimeout(() => {
                    const section = document.getElementById(cat.name);
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                    setOpenCategory(cat.name);
                  }, 300);
                } else {
                  toggle(cat.name);
                  const section = document.getElementById(cat.name);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className={`flex items-center cursor-pointer select-none hover:opacity-90 active:scale-95 transition-transform ${isCollapsed ? "justify-center w-full p-2 bg-[#5D4037]/30 rounded-xl" : "justify-start gap-4"}`}
            >
              <div className="text-[#BF360C]">{cat.icon}</div>

              {!isCollapsed && (
                <h3 className="text-3xl font-bold whitespace-nowrap">
                  {cat.name}
                </h3>
              )}
            </div>

            {/* Subcategories */}
            {!isCollapsed && openCategory === cat.name && (
              <ul className="ml-10 mt-2 space-y-2 text-sm opacity-80 animate-in fade-in slide-in-from-top-2 duration-200">
                {cat.items.map((i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:opacity-100 transition-opacity hover:text-[#BF360C]"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Branding */}
      <div className={`text-sm opacity-60 text-center whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? "opacity-0 scale-0" : "opacity-60 scale-100"}`}>
        TouristAI — Powered by N-ATLAS
      </div>
    </div>
  );
}


export default Sidebar;
