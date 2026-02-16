import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const nav = useNavigate();
  const loc = useLocation();

  const [q, setQ] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    setQ(params.get("q") || "");
  }, [loc.search]);

  const isHome = useMemo(() => loc.pathname === "/", [loc.pathname]);

  function onSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    nav(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="container-fluid px-3 px-md-4 pt-3">
      <div className="glass p-3 p-md-4 d-flex align-items-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
            <span className="bg-warning text-dark d-inline-flex align-items-center justify-content-center rounded-3"
              style={{ width: 38, height: 38 }}>
              <i className="bi bi-lightning-charge-fill" />
            </span>
            <div>
              <div className="brand fs-4">ProChef</div>
              <div className="text-secondary small" style={{ marginTop: -4 }}>
                Explore cuisines • search • cook step-by-step
              </div>
            </div>
          </Link>

          {!isHome && (
            <button
              className="btn btn-outline-light pill ms-2"
              onClick={() => nav(-1)}
              title="Back"
            >
              <i className="bi bi-arrow-left" /> Back
            </button>
          )}
        </div>

        <form onSubmit={onSubmit} className="d-flex gap-2 flex-grow-1 justify-content-end">
          <div className="soft px-3 d-flex align-items-center gap-2" style={{ maxWidth: 720, width: "100%" }}>
            <i className="bi bi-search text-secondary" />
            <input
              className="form-control bg-transparent border-0 text-light"
              placeholder="Search dishes, ingredients, cuisines..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <motion.button whileTap={{ scale: 0.96 }} className="btn btn-primary pill px-4" type="submit">
            Search
          </motion.button>
        </form>
      </div>
    </div>
  );
}
