
export default function SkeletonCard() {
  return (
    <div className="soft" style={{ width: 320, minWidth: 320 }}>
      <div style={{ height: 220, background: "rgba(255,255,255,.06)" }} />
      <div className="p-3">
        <div style={{ height: 16, width: "70%", background: "rgba(255,255,255,.08)", borderRadius: 8 }} />
        <div className="mt-2" style={{ height: 12, width: "45%", background: "rgba(255,255,255,.06)", borderRadius: 8 }} />
      </div>
    </div>
  );
}
