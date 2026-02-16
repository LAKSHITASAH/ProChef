import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MealDetails from "./pages/MealDetails.jsx";
import Search from "./pages/Search.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meal/:id" element={<MealDetails />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
