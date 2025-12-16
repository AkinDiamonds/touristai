
import nikeArtImg from "../assets/nike-art.jfif";
import elegushiBeachImg from "../assets/Elegushi-private.webp";
import freedomParkImg from "../assets/Images_of_Freedom_Park_63.jpg";
import terraKultureImg from "../assets/terra kulture.jpg";
import lekkirConservationImg from "../assets/lekki-conservation-centre-aerial-view.jpeg";
import nationalMuseumImg from "../assets/national museum.jfif";
import kalakutaMuseumImg from "../assets/kalakuta museum.jpg";
import tarkwaBayImg from "../assets/Tarkwa-Bay-Beach.jpg";
import newAfrikaShrineImg from "../assets/new afrika shrine.avif";
import lufasiParkImg from "../assets/lufasi1-824x618.jpg";
import jhalobiaRecreationImg from "../assets/jhalobia recreation.webp";
import laCampagneImg from "../assets/la campagne tropicana.jpg";
import omuResortImg from "../assets/Omu resort.webp";
import oniruBeachImg from "../assets/oniru.jfif";
import nationalArtImg from "../assets/national art.webp";
import jkRandleImg from "../assets/JK-Randle-Centre.png";
import badagryImg from "../assets/badagry slavery.jfif";
import cathedralImg from "../assets/The_Cathedral_Church_of_Christ_Marina..jpg";
import tafawaSquareImg from "../assets/Tafawa_Balewa_Square,_Lagos.jpg";
import jakaelHouseImg from "../assets/jakael house.jpg";
import lccImg from "../assets/Lcc2.jpg";
import bgImage from "../assets/bg.png";

export const places = [
  {
    id: "Nike-Art-Gallery",
    title: "Nike Art Gallery",
    type: "Museum",
    image: nikeArtImg,
    category: "Recommended",
    rating: 4.8,
    reviews: 1540,
    description: "Nike Art Gallery is an art gallery in Lagos, Nigeria owned by Nike Davies-Okundaye. The gallery is arguably the largest of its kind in West Africa. Housed in a five-storey tall building, it boasts a collection of about 8,000 diverse artworks from various Nigerian artists.",
    location: "Lekki, Lagos",
    hours: "10:00 AM - 6:00 PM",
    price: "Free",
    tips: ["great for art lovers", "gift shop available", "workshops often held"]
  },
  {
    id: "Elegushi-Beach",
    title: "Elegushi Beach",
    type: "Beach",
    image: elegushiBeachImg,
    category: "Recommended",
    rating: 4.2,
    reviews: 3200,
    description: "Elegushi Royal Beach is a private beach in Lekki, Lagos state, southwest Nigeria. The beach is owned by the Elegushi royal family in Lekki, Lagos state. It is one of the most popular beaches in Lagos.",
    location: "Lekki, Lagos",
    hours: "24 Hours",
    price: "₦2,000 Entry",
    tips: ["very busy on weekends", "horse riding available", "lots of food vendors"]
  },
  {
    id: "Yellow-Chilli",
    title: "Yellow Chilli",
    type: "Restaurant",
    image: terraKultureImg,
    category: "Recommended",
    rating: 4.4,
    reviews: 890,
    description: "Yellow Chilli is a trendy restaurant offering a fusion of African and continental dishes. It is a popular spot for both locals and tourists looking for a taste of authentic Nigerian cuisine in a modern setting.",
    location: "Victoria Island, Lagos",
    hours: "12:00 PM - 10:00 PM",
    price: "₦10,000 - ₦20,000",
    tips: ["try the jollof rice", "reservations recommended on weekends", "great cocktails"]
  },
  {
    id: "Freedom-Park",
    title: "Freedom Park",
    type: "Attraction",
    image: freedomParkImg,
    category: "Recommended",
    rating: 4.5,
    reviews: 1100,
    description: "Freedom Park is a memorial and leisure park area in the middle of downtown Lagos in Lagos Island, Nigeria which was formerly Her Majesty's Broad Street Prison. It was designed by the Architect Theo Lawson.",
    location: "Lagos Island, Lagos",
    hours: "11:00 AM - 11:00 PM",
    price: "₦500 Entry",
    tips: ["historic site tours", "live music events", "museum on site"]
  },
  {
    id: "RSVP-Lagos",
    title: "RSVP Lagos",
    type: "Fine Dining",
    image: tafawaSquareImg,
    category: "Eat & Drink",
    rating: 4.6,
    reviews: 750,
    description: "RSVP Lagos is a contemporary restaurant and bar serving New American cuisine. It's known for its chic industrial design and vibrant atmosphere.",
    location: "Victoria Island, Lagos",
    hours: "12:00 PM - 12:00 AM",
    price: "₦20,000+",
    tips: ["poolside seating", "famous for cocktails", "upscale crowd"]
  },
  {
    id: "Danfo-Bistro",
    title: "Danfo Bistro",
    type: "Casual Dining",
    image: nikeArtImg,
    category: "Eat & Drink",
    rating: 4.3,
    reviews: 920,
    description: "Danfo Bistro offers a quirky, Lagos-transport-themed dining experience. It serves a mix of local and international comfort food.",
    location: "Ikoyi, Lagos",
    hours: "10:00 AM - 10:00 PM",
    price: "₦5,000 - ₦15,000",
    tips: ["instagrammable decor", "try the burger", "outdoor seating"]
  },
  {
    id: "Hard-Rock-Cafe",
    title: "Hard Rock Cafe",
    type: "Bar & Grill",
    image: newAfrikaShrineImg,
    category: "Eat & Drink",
    rating: 4.5,
    reviews: 2100,
    description: "Hard Rock Cafe Lagos brings the legendary music-themed dining experience to the city. Enjoy classic American burgers and live music performances.",
    location: "Oniru, Victoria Island",
    hours: "12:00 PM - 1:00 AM",
    price: "₦15,000 - ₦30,000",
    tips: ["live bands", "ocean view", "memorabilia collection"]
  },
  {
    id: "Terra-Kulture-Food-Court",
    title: "Terra Kulture Food Court",
    type: "African Cuisine",
    image: terraKultureImg,
    category: "Eat & Drink",
    rating: 4.6,
    reviews: 1300,
    description: "Terra Kulture is a leading art, culture, lifestyle, and educational centre in Nigeria. Its food court offers some of the best Nigerian dishes in a culturally rich environment.",
    location: "Victoria Island, Lagos",
    hours: "9:00 AM - 10:00 PM",
    price: "₦5,000 - ₦10,000",
    tips: ["visit the gallery upstairs", "try the pounding yam", "cultural plays on weekends"]
  },
  {
    id: "Lekki-Conservation-Centre",
    title: "Lekki Conservation Centre",
    type: "Nature Reserve",
    image: lekkirConservationImg,
    category: "Attractions",
    rating: 4.4,
    reviews: 4500,
    description: "Lekki Conservation Centre is a 78-hectare natural resource conservation area in Lekki, Lagos State. It has the longest canopy walkway in Africa.",
    location: "Lekki, Lagos",
    hours: "8:30 AM - 5:00 PM",
    price: "₦2,000",
    tips: ["wear comfortable shoes", "canopy walk is high", "watch out for monkeys"]
  },
  {
    id: "National-Museum",
    title: "National Museum",
    type: "Museum",
    image: nationalMuseumImg,
    category: "Attractions",
    rating: 4.0,
    reviews: 600,
    description: "The Nigerian National Museum is a national museum of Nigeria, located in the city of Lagos. The museum has a notable collection of Nigerian art, including pieces of statuary and carvings and archaeological and ethnographic exhibits.",
    location: "Onikan, Lagos",
    hours: "10:00 AM - 4:00 PM",
    price: "₦500",
    tips: ["rich history", "educational tour", "near other landmarks"]
  },
  {
    id: "Kalakuta-Republic-Museum",
    title: "Kalakuta Republic Museum",
    type: "History",
    image: kalakutaMuseumImg,
    category: "Attractions",
    rating: 4.7,
    reviews: 800,
    description: "Kalakuta Republic Museum is a museum in Lagos, Nigeria. It is located in the former house of huge Nigerian musician and activist Fela Kuti.",
    location: "Ikeja, Lagos",
    hours: "10:00 AM - 6:00 PM",
    price: "₦1,000",
    tips: ["rooftop bar", "fela's room preserved", "music history"]
  },
  {
    id: "Tarkwa-Bay",
    title: "Tarkwa Bay",
    type: "Beach & Surf",
    image: tarkwaBayImg,
    category: "Attractions",
    rating: 4.5,
    reviews: 1500,
    description: "Tarkwa Bay is a sheltered beach located near the Lagos Harbour. It is popular with swimmers and water-sports enthusiasts, also home to a welcoming resident community.",
    location: "Lagos Island (via boat)",
    hours: "Dawn to Dusk",
    price: "Boat ride fees vary",
    tips: ["take a boat from CMS or Tarzan", "bring cash", "surfing lessons available"]
  },
  {
    id: "Quilox",
    title: "Quilox",
    type: "Nightclub",
    image: nationalArtImg,
    category: "Events & Nightlife",
    rating: 4.3,
    reviews: 1200,
    description: "Club Quilox is a luxurious nightlife destination in Lagos. It offers a premium clubbing experience with top DJs and VIP services.",
    location: "Victoria Island, Lagos",
    hours: "10:00 PM - 5:00 AM (Fri-Sun)",
    price: "High End",
    tips: ["dress to impress", "booking a table helps", "late night fun"]
  },
  {
    id: "Moist-Beach-Club",
    title: "Moist Beach Club",
    type: "Beach Club",
    image: elegushiBeachImg,
    category: "Events & Nightlife",
    rating: 4.4,
    reviews: 900,
    description: "Moist Beach Club offers a vibrant beachside experience with a pool, bar, and restaurant. It's a popular spot for parties and day-time relaxation.",
    location: "Oniru, Lagos",
    hours: "12:00 PM - 2:00 AM",
    price: "Entry Fee varies",
    tips: ["pool parties", "great atmosphere", "beach access"]
  },
  {
    id: "New-Afrika-Shrine",
    title: "New Afrika Shrine",
    type: "Live Music",
    image: newAfrikaShrineImg,
    category: "Events & Nightlife",
    rating: 4.6,
    reviews: 2500,
    description: "The New Afrika Shrine is an open-air entertainment centre in Ikeja, Lagos State. It is the replacement of the old Afrika Shrine created in 1970 by Fela Kuti.",
    location: "Ikeja, Lagos",
    hours: "Open Daily, Shows on Thu/Sun",
    price: "Free (except show nights)",
    tips: ["live seun/femi kuti shows", "energetic vibe", "historical significance"]
  },
  {
    id: "Filmhouse-IMAX",
    title: "Filmhouse IMAX",
    type: "Cinema",
    image: jkRandleImg,
    category: "Events & Nightlife",
    rating: 4.7,
    reviews: 3000,
    description: "Filmhouse IMAX Lekki is the first IMAX cinema in West Africa. It offers a premium movie-watching experience with state-of-the-art technology.",
    location: "Lekki, Lagos",
    hours: "10:00 AM - 12:00 AM",
    price: "₦4,000 - ₦8,000",
    tips: ["book tickets online", "vip experience", "popcorn is great"]
  },
  {
    id: "Lufasi-Park",
    title: "Lufasi Park",
    type: "Park",
    image: lufasiParkImg,
    category: "Nature & Parks",
    rating: 4.5,
    reviews: 600,
    description: "LUFASI is an urban forest park in Lekki, Lagos. It is a sanctuary for nature and a centre for environmental education.",
    location: "Lekki-Epe Expressway, Lagos",
    hours: "9:00 AM - 6:00 PM",
    price: "₦1,000",
    tips: ["nature trails", "animal shelter", "peaceful environment"]
  },
  {
    id: "Jhalobia-Recreation-Park",
    title: "Jhalobia Recreation Park",
    type: "Garden",
    image: jhalobiaRecreationImg,
    category: "Nature & Parks",
    rating: 4.3,
    reviews: 400,
    description: "Jhalobia Recreation Park and Gardens is a beautiful multi-purpose park in Lagos. It features lush gardens, waterfalls, and space for events.",
    location: "Ikeja, Lagos",
    hours: "8:00 AM - 7:00 PM",
    price: "Entry Fee",
    tips: ["wedding venue", "beautiful landscaping", "photography spot"]
  },
  {
    id: "Dr.-Lely's-Park",
    title: "Dr. Lely's Park",
    type: "Picnic",
    image: lekkirConservationImg,
    category: "Nature & Parks",
    rating: 4.0,
    reviews: 200,
    description: "A serene park suitable for picnics and relaxation away from the city noise.",
    location: "Lagos",
    hours: "9:00 AM - 6:00 PM",
    price: "Free",
    tips: ["bring a mat", "good for kids", "quiet"]
  },
  {
    id: "Ndubuisi-Kanu-Park",
    title: "Ndubuisi Kanu Park",
    type: "Public Park",
    image: freedomParkImg,
    category: "Nature & Parks",
    rating: 4.2,
    reviews: 800,
    description: "Ndubuisi Kanu Park is a public park in Ikeja, Lagos. It offers a green space for recreation, exercise, and leisure.",
    location: "Alausa, Ikeja",
    hours: "8:00 AM - 7:00 PM",
    price: "Free",
    tips: ["basketball court", "playground", "picnic area"]
  }
];

export const getPlaceById = (id) => {
  return places.find(place => place.id === id);
}

export const getPlacesByCategory = (category) => {
  return places.filter(place => place.category === category);
}
