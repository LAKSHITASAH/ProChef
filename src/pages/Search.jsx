import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Section from "../components/Section.jsx";
import MealCard from "../components/MealCard.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import { searchMeals } from "../api/mealdb.js";

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem("prochef_search_history") || "[]");
  } catch {
    return [];
  }
}
function saveHistory(items) {
  localStorage.setItem("prochef_search_history", JSON.stringify(items.slice(0, 10)));
}

export default function Search() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();

  const [data, setData] = useState(null);
  const [history, setHistory] = useState(loadHistory());

  useEffect(() => {
    if (!q) {
      setData([]);
      return;
    }
    setData(null);
    searchMeals(q)
      .then((meals) => setData(meals))
      .catch(() => setData([]));

    // save history
    const next = [q, ...history.filter((x) => x !== q)];
    setHistory(next);
    saveHistory(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const hasQuery = useMemo(() => !!q, [q]);

  return (
    <>
      <Navbar />

      <Section icon={<i className="bi bi-search" />} title={hasQuery ? `Search results for “${q}”` : "Search"}>
        {!hasQuery && (
          <div className="text-secondary">
            Type in the search bar above. Example: <b>chicken</b>, <b>biryani</b>, <b>pasta</b>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-3">
            <div className="text-secondary small mb-2">Recent searches:</div>
            <div className="d-flex flex-wrap gap-2">
              {history.map((h) => (
                <Link key={h} className="btn btn-outline-light pill" to={`/search?q=${encodeURIComponent(h)}`}>
                  {h}
                </Link>
              ))}
              <button
                className="btn btn-outline-danger pill"
                onClick={() => {
                  localStorage.removeItem("prochef_search_history");
                  setHistory([]);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 d-flex gap-2">
          <button className="btn btn-outline-light pill" onClick={() => nav("/")}>
            <i className="bi bi-house-door" /> Back to Home
          </button>
        </div>

        <div className="mt-4 d-flex flex-wrap gap-3">
          {!data
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : data.length === 0
            ? <div className="text-secondary">No results found. Try another keyword.</div>
            : data.map((m) => (
                <MealCard
                  key={m.idMeal}
                  meal={m}
                  subtitle={`${m.strArea || "Global"} • ${m.strCategory || "Recipe"}`}
                  onClick={() => nav(`/meal/${m.idMeal}`)}
                />
              ))}
        </div>
      </Section>

      <Footer />
    </>
  );
}
