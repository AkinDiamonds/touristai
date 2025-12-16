import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MessageSquare, ArrowRight, Star, Clock, MapPin, DollarSign } from "lucide-react";
import { fetchPlaceById } from "../services/placesService";

function PlaceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [placeData, setPlaceData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPlace = async () => {
            setIsLoading(true);
            try {
                const data = await fetchPlaceById(id);
                setPlaceData(data);
            } catch (error) {
                console.error("Error loading place:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPlace();
    }, [id]);

    const handleChat = () => {
        if (!placeData) return;
        navigate("/", { state: { focusInput: true, query: `Tell me more about ${placeData.title}` } });
    };

    const handleNext = () => {
        // Cycle to a dummy next place
        navigate("/place/Elegushi-Beach");
    };

    if (isLoading) {
        return (
            <div className="flex-1 h-full flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#BF360C]/20 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#BF360C] rounded-full animate-spin"></div>
                    </div>
                    <p className="text-[#5D4037] font-medium">Loading place details...</p>
                </div>
            </div>
        );
    }

    if (!placeData) {
        return (
            <div className="flex-1 h-full flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#3E2723] mb-4">Place Not Found</h2>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-[#3E2723] text-white px-6 py-3 rounded-xl hover:bg-[#5D4037] transition-all"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 h-full overflow-y-auto relative z-0">
            {/* Hero Header */}
            <div className="h-[40vh] w-full bg-[#3E2723] rounded-t-xl relative rounded-b-xl">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                {/* Placeholder Image */}
                <div className="absolute inset-0 bg-[#5D4037] opacity-50 rounded-t-xl rounded-b-xl"></div>

                <button
                    onClick={() => navigate("/")}
                    className="absolute top-8 left-8 z-20 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all flex items-center gap-2 font-bold"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="absolute bottom-10 left-8 md:left-16 z-20 text-white">
                    <span className="bg-[#BF360C] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                        {placeData.type}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold shadow-black drop-shadow-lg">{placeData.title}</h1>
                    <div className="flex items-center gap-4 mt-2 text-sm font-medium opacity-90">
                        <span className="flex items-center gap-1"><Star size={16} fill="white" /> {placeData.rating} ({placeData.reviews} reviews)</span>
                        <span className="flex items-center gap-1"><MapPin size={16} /> {placeData.location}</span>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-4xl mx-auto p-8 md:p-16">

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4037]/10 flex items-center gap-4">
                        <div className="bg-[#FAF3E0] p-3 rounded-full text-[#BF360C]"><Clock size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-[#5D4037] uppercase opacity-70">Opening Hours</p>
                            <p className="text-lg font-bold text-[#3E2723]">{placeData.hours}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#5D4037]/10 flex items-center gap-4">
                        <div className="bg-[#FAF3E0] p-3 rounded-full text-[#BF360C]"><DollarSign size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-[#5D4037] uppercase opacity-70">Entry Fee</p>
                            <p className="text-lg font-bold text-[#3E2723]">{placeData.price}</p>
                        </div>
                    </div>
                </div>

                {/* Description ("Blog" Style) */}
                <div className="space-y-6 text-lg text-[#5D4037] leading-relaxed font-medium">
                    <h2 className="text-3xl font-bold text-[#3E2723] mb-4">About this place</h2>
                    <p>{placeData.description}</p>
                    <p>
                        Lagos is known for its energy, and {placeData.title} captures that perfectly. Whether you are visiting for the first time or you are a local, the atmosphere here is unmatched.
                    </p>

                    <h3 className="text-2xl font-bold text-[#3E2723] mt-8 mb-4">Top Tips</h3>
                    <ul className="list-disc list-inside space-y-2 marker:text-[#BF360C]">
                        {placeData.tips.map(tip => <li key={tip}>{tip}</li>)}
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-20 flex flex-col md:flex-row gap-6 border-t-2 border-[#5D4037]/10 pt-10">
                    <button
                        onClick={handleChat}
                        className="flex-1 bg-[#3E2723] text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#5D4037] transition-all shadow-lg hover:shadow-xl active:scale-95"
                    >
                        <MessageSquare size={24} /> Chat with AI about this
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex-1 bg-[#FAF3E0] text-[#3E2723] py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#f0e4ca] transition-all border border-[#5D4037]/20 active:scale-95"
                    >
                        Next Place <ArrowRight size={24} />
                    </button>
                </div>
            </div>

        </div>
    );
}

export default PlaceDetails;
