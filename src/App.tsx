import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MealDetails from "./pages/MealDetails";
import PahariDetails from "./pages/PahariDetails";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/pahari/:slug" element={<PahariDetails />} />
      </Routes>
    </>
  );
}
