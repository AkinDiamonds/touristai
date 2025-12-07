import { BrowserRouter, Routes, Route } from "react-router-dom";
import Parentview from "./components/Parentview";
import AIpanel from "./components/AIpanel";
import PlaceDetails from "./components/PlaceDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Parentview />}>
          <Route index element={<AIpanel />} />
          <Route path="place/:id" element={<PlaceDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;