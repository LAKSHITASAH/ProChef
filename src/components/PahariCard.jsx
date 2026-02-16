import { useNavigate } from "react-router-dom";

export default function PahariCard({ item }) {
  const nav = useNavigate();
  return (
    <div
      onClick={() => nav(`/pahari/${item.slug}`)}
      className="card border-0 text-white"
      style={{
        minWidth: 280,
        cursor: "pointer",
        borderRadius: 18,
        overflow: "hidden",
        background: "rgba(255,255,255,.06)",
        border: "1px solid rgba(255,255,255,.10)",
        boxShadow: "0 14px 40px rgba(0,0,0,.30)",
      }}
    >
      <div style={{ position: "relative" }}>
        <img src={item.image} alt={item.name} style={{ height: 170, width: "100%", objectFit: "cover" }} />
        <span className="badge text-bg-warning" style={{ position: "absolute", top: 10, right: 10 }}>
          🏔 Pahari
        </span>
      </div>
      <div className="p-3">
        <div className="fw-semibold">{item.name}</div>
        <div className="text-secondary small">{item.famousIn}</div>
        <div className="text-secondary small mt-1">Click to view recipe</div>
      </div>
    </div>
  );
}
