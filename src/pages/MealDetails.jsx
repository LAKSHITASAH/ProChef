import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { mealDetails, parseIngredients, tasteProfile, youtubeId } from "../api/mealdb.js";
import { motion } from "framer-motion";

export default function MealDetails() {
  const nav = useNavigate();
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mealDetails(id)
      .then((m) => setMeal(m))
      .finally(() => setLoading(false));
  }, [id]);

  const ingredients = useMemo(() => (meal ? parseIngredients(meal) : []), [meal]);
  const yt = useMemo(() => youtubeId(meal?.strYoutube), [meal]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container-fluid px-3 px-md-4 mt-4">
          <div className="glass p-4">Loading recipe…</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!meal) {
    return (
      <>
        <Navbar />
        <div className="container-fluid px-3 px-md-4 mt-4">
          <div className="glass p-4">
            Recipe not found.
            <button className="btn btn-outline-light pill ms-3" onClick={() => nav("/")}>
              Back Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container-fluid px-3 px-md-4 mt-4">
        <div className="glass p-4">
          <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
            <div>
              <div className="display-6 fw-bold">{meal.strMeal}</div>
              <div className="text-secondary">
                {meal.strArea} • {meal.strCategory}
              </div>

              <div className="mt-3 d-flex flex-wrap gap-2">
                <span className="badge text-bg-primary pill">{meal.strArea}</span>
                <span className="badge text-bg-success pill">{meal.strCategory}</span>
                {meal.strTags?.split(",").slice(0, 4).map((t) => (
                  <span key={t} className="badge text-bg-secondary pill">#{t.trim()}</span>
                ))}
              </div>

              <div className="mt-3">
                <div className="text-secondary small">Suggested taste profile</div>
                <div className="fw-semibold">{tasteProfile(meal)}</div>
                <div className="text-secondary small mt-1">
                  (This is an AI-style suggestion based on cuisine/category/tags.)
                </div>
              </div>

              <div className="mt-4 d-flex gap-2 flex-wrap">
                <button className="btn btn-outline-light pill" onClick={() => nav(-1)}>
                  <i className="bi bi-arrow-left" /> Back
                </button>
                <button className="btn btn-outline-light pill" onClick={() => nav("/")}>
                  <i className="bi bi-house-door" /> Home
                </button>
                {meal.strSource && (
                  <a className="btn btn-outline-info pill" href={meal.strSource} target="_blank" rel="noreferrer">
                    <i className="bi bi-link-45deg" /> Source
                  </a>
                )}
                {meal.strYoutube && (
                  <a className="btn btn-danger pill" href={meal.strYoutube} target="_blank" rel="noreferrer">
                    <i className="bi bi-youtube" /> YouTube
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="row g-4 mt-2">
            {/* LEFT: Image + video */}
            <div className="col-12 col-lg-5">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="soft overflow-hidden">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  style={{ width: "100%", height: 420, objectFit: "cover" }}
                />
              </motion.div>

              {yt && (
                <div className="soft mt-3 p-3">
                  <div className="fw-bold mb-2"><i className="bi bi-play-circle" /> Watch video</div>
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${yt}`}
                      title="YouTube recipe"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Ingredients + Steps */}
            <div className="col-12 col-lg-7">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="soft p-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-list-check text-warning" />
                  <div className="h4 m-0 fw-bold">Key Ingredients</div>
                </div>

                <div className="row">
                  {ingredients.map((x, idx) => (
                    <div key={idx} className="col-12 col-md-6 mb-2">
                      <i className="bi bi-dot text-info" />{" "}
                      <span className="fw-semibold">{x.ing}</span>
                      {x.meas ? <span className="text-secondary"> — {x.meas}</span> : null}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="soft p-4 mt-3">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-journal-text text-warning" />
                  <div className="h4 m-0 fw-bold">Step-by-step Instructions</div>
                </div>

                <ol className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
                  {meal.strInstructions
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((s, i) => (
                      <li key={i} className="mb-2">{s}</li>
                    ))}
                </ol>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
