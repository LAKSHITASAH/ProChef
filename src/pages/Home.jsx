import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Section from "../components/Section.jsx";
import HorizontalRail from "../components/HorizontalRail.jsx";
import MealCard from "../components/MealCard.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import { byCategory, byCuisine, byIngredient, listAreas, randomMeals } from "../api/mealdb.js";

const DEFAULT_AREAS = ["Indian", "Italian", "Mexican", "American", "British", "Canadian", "Chinese", "Russian", "Thai", "Japanese", "French"];
const CATEGORIES = ["Seafood", "Dessert", "Chicken", "Beef", "Vegetarian", "Pasta", "Side", "Breakfast"];
const INGREDIENTS = ["Chicken", "Rice", "Potato", "Egg", "Paneer", "Tomato", "Mushroom", "Fish"];

export default function Home() {
  const nav = useNavigate();

  const [areas, setAreas] = useState(DEFAULT_AREAS);
  const [activeArea, setActiveArea] = useState("Indian");

  const [staff, setStaff] = useState(null);
  const [quick, setQuick] = useState(null);
  const [indian, setIndian] = useState(null);

  const [activeCategory, setActiveCategory] = useState("Seafood");
  const [categoryMeals, setCategoryMeals] = useState(null);

  const [activeIngredient, setActiveIngredient] = useState("Chicken");
  const [ingredientMeals, setIngredientMeals] = useState(null);

  // ✅ ADDED (does NOT affect your existing logic)
  const [areaMeals, setAreaMeals] = useState(null);

  // Load area list once (optional)
  useEffect(() => {
    listAreas()
      .then((all) => {
        const merged = [...new Set([...DEFAULT_AREAS, ...all])];
        setAreas(merged);
      })
      .catch(() => {});
  }, []);

  // Staff picks
  useEffect(() => {
    setStaff(null);
    randomMeals(10).then(setStaff).catch(() => setStaff([]));
  }, []);

  // Quick meals (use a popular category for fast loading)
  useEffect(() => {
    setQuick(null);
    byCategory("Chicken", 18).then(setQuick).catch(() => setQuick([]));
  }, []);

  // Indian specials always visible
  useEffect(() => {
    setIndian(null);
    byCuisine("Indian", 18).then(setIndian).catch(() => setIndian([]));
  }, []);

  // Active area changes (your existing logic — unchanged)
  useEffect(() => {
    setCategoryMeals(null);
    byCuisine(activeArea, 18).then(setCategoryMeals).catch(() => setCategoryMeals([]));
  }, [activeArea]);

  // ✅ ADDED: fetch meals for the clicked cuisine chips (no change to your old logic)
  useEffect(() => {
    setAreaMeals(null);
    byCuisine(activeArea, 18).then(setAreaMeals).catch(() => setAreaMeals([]));
  }, [activeArea]);

  // Category filter
  useEffect(() => {
    setCategoryMeals(null);
    byCategory(activeCategory, 18).then(setCategoryMeals).catch(() => setCategoryMeals([]));
  }, [activeCategory]);

  // Ingredient filter
  useEffect(() => {
    setIngredientMeals(null);
    byIngredient(activeIngredient, 18).then(setIngredientMeals).catch(() => setIngredientMeals([]));
  }, [activeIngredient]);

  const topAreas = useMemo(() => areas.slice(0, 14), [areas]);

  const openMeal = (id) => nav(`/meal/${id}`);

  return (
    <>
      <Navbar />

      {/* Global cuisines chips */}
      <div className="container-fluid px-3 px-md-4 mt-4">
        <div className="glass p-4">
          <div className="d-flex align-items-center gap-2 text-info fw-semibold mb-2">
            <i className="bi bi-globe2" /> Global Cuisines
          </div>

          <div className="d-flex flex-wrap gap-2">
            {topAreas.map((a) => (
              <button
                key={a}
                className={`btn pill ${activeArea === a ? "btn-primary" : "btn-outline-light"}`}
                onClick={() => setActiveArea(a)}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ ADDED SECTION: Click a cuisine → show recipes */}
      <Section icon={<i className="bi bi-stars" />} title={`In ${activeArea} Specials`}>
        <HorizontalRail>
          {!areaMeals
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : areaMeals.map((m) => (
                <MealCard
                  key={m.idMeal}
                  meal={m}
                  subtitle={`${activeArea} • Click to view`}
                  onClick={() => openMeal(m.idMeal)}
                />
              ))}
        </HorizontalRail>
      </Section>

      {/* Staff Picks */}
      <Section icon={<i className="bi bi-clock-history" />} title="Staff Curated Picks">
        <HorizontalRail>
          {!staff
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : staff.map((m) => (
                <MealCard
                  key={m.idMeal}
                  meal={m}
                  subtitle={`${m.strArea || "Global"} • ${m.strCategory || "Recipe"}`}
                  onClick={() => openMeal(m.idMeal)}
                />
              ))}
        </HorizontalRail>
      </Section>

      {/* Quick meals */}
      <Section icon={<i className="bi bi-lightning-charge" />} title="Quick & Easy Meals">
        <HorizontalRail>
          {!quick
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : quick.map((m) => (
                <MealCard
                  key={m.idMeal}
                  meal={m}
                  subtitle="Fast to cook • Click to view"
                  onClick={() => openMeal(m.idMeal)}
                />
              ))}
        </HorizontalRail>
      </Section>

      {/* Indian */}
      <Section icon={<i className="bi bi-fire" />} title="Indian Specials">
        <HorizontalRail>
          {!indian
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : indian.map((m) => (
                <MealCard
                  key={m.idMeal}
                  meal={m}
                  subtitle="Indian • Click to view"
                  onClick={() => openMeal(m.idMeal)}
                />
              ))}
        </HorizontalRail>
      </Section>

      {/* Category filter */}
      <Section icon={<i className="bi bi-grid-1x2" />} title="Browse by Category">
        <div className="d-flex flex-wrap gap-2 mb-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`btn pill ${activeCategory === c ? "btn-warning text-dark" : "btn-outline-light"}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <HorizontalRail>
          {!categoryMeals
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : categoryMeals.map((m) => (
                <MealCard
                  key={m.idMeal}
                  meal={m}
                  subtitle={`${activeCategory} • Click to view`}
                  onClick={() => openMeal(m.idMeal)}
                />
              ))}
        </HorizontalRail>
      </Section>

      {/* Ingredient filter */}
      <Section icon={<i className="bi bi-basket2" />} title="Quick Filter by Ingredient">
        <div className="d-flex flex-wrap gap-2 mb-3">
          {INGREDIENTS.map((ing) => (
            <button
              key={ing}
              className={`btn pill ${activeIngredient === ing ? "btn-info text-dark" : "btn-outline-light"}`}
              onClick={() => setActiveIngredient(ing)}
            >
              {ing}
            </button>
          ))}
        </div>

        <HorizontalRail>
          {!ingredientMeals
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : ingredientMeals.map((m) => (
                <MealCard
                  key={m.idMeal}
                  meal={m}
                  subtitle={`${activeIngredient} • Click to view`}
                  onClick={() => openMeal(m.idMeal)}
                />
              ))}
        </HorizontalRail>
      </Section>

      <Footer />
    </>
  );
}
