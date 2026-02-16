import { motion } from "framer-motion";

export default function MealCard({ meal, subtitle, onClick }) {
  const thumb =
    meal?.strMealThumb ||
    meal?.thumb ||
    "https://source.unsplash.com/600x450/?food,recipe";

  const title = meal?.strMeal || meal?.title || "Recipe";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="soft card-pro"
      style={{ width: 320, minWidth: 320 }}
      onClick={onClick}
      role="button"
    >
      <img className="img-cover" src={thumb} alt={title} loading="lazy" />
      <div className="p-3">
        <div className="fw-bold">{title}</div>
        <div className="text-secondary small">{subtitle || "Click to view recipe"}</div>
      </div>
    </motion.div>
  );
}
