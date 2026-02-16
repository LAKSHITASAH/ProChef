export default function CategoryChips({ items, active, onPick }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {items.map((x) => (
        <button
          key={x}
          onClick={() => onPick(x)}
          className={"btn btn-sm rounded-pill " + (active === x ? "btn-primary" : "btn-outline-light")}
        >
          {x}
        </button>
      ))}
    </div>
  );
}
