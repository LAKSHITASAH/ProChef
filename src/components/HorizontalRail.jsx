import { useRef, useEffect } from "react";

export default function HorizontalRail({ children }) {
  const ref = useRef(null);

  const scrollBy = (dx) => {
    ref.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  // ✅ AUTO SCROLL ADDED (does not affect your existing logic)
  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;

    let interval;

    const start = () => {
      interval = setInterval(() => {
        if (!rail) return;

        rail.scrollBy({ left: 1 });

        // loop back when end reached
        if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth) {
          rail.scrollTo({ left: 0 });
        }
      }, 20);
    };

    const stop = () => clearInterval(interval);

    start();
    rail.addEventListener("mouseenter", stop);
    rail.addEventListener("mouseleave", start);

    return () => {
      stop();
      rail.removeEventListener("mouseenter", stop);
      rail.removeEventListener("mouseleave", start);
    };
  }, []);
  // ✅ END OF ADDED LOGIC

  return (
    <div className="position-relative">
      <div className="rail d-flex gap-3" ref={ref}>
        {children}
      </div>

      <div className="position-absolute top-50 end-0 translate-middle-y d-flex gap-2">
        <button
          className="btn btn-outline-light kbd-btn"
          onClick={() => scrollBy(-520)}
          title="Left"
        >
          <i className="bi bi-chevron-left" />
        </button>

        <button
          className="btn btn-outline-light kbd-btn"
          onClick={() => scrollBy(520)}
          title="Right"
        >
          <i className="bi bi-chevron-right" />
        </button>
      </div>
    </div>
  );
}
