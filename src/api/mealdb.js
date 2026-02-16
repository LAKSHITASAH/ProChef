const BASE = "https://www.themealdb.com/api/json/v1/1";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API error");
  return res.json();
}

// Random meals (for Staff Picks)
export async function randomMeals(count = 10) {
  const calls = Array.from({ length: count }, () => fetchJson(`${BASE}/random.php`));
  const data = await Promise.all(calls);
  return data.map((d) => d.meals?.[0]).filter(Boolean);
}

// By Area/Cuisine (e.g., Indian, Italian...)
export async function byCuisine(area, limit = 18) {
  const d = await fetchJson(`${BASE}/filter.php?a=${encodeURIComponent(area)}`);
  return (d.meals || []).slice(0, limit);
}

// By Category (e.g., Seafood, Dessert...)
export async function byCategory(category, limit = 18) {
  const d = await fetchJson(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
  return (d.meals || []).slice(0, limit);
}

// By Ingredient (e.g., Chicken, Rice...)
export async function byIngredient(ingredient, limit = 18) {
  const d = await fetchJson(`${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`);
  return (d.meals || []).slice(0, limit);
}

// Full details by ID
export async function mealDetails(id) {
  const d = await fetchJson(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`);
  return d.meals?.[0] || null;
}

// Search meals by name
export async function searchMeals(query) {
  const d = await fetchJson(`${BASE}/search.php?s=${encodeURIComponent(query)}`);
  return d.meals || [];
}

// List areas (for chips)
export async function listAreas() {
  const d = await fetchJson(`${BASE}/list.php?a=list`);
  return (d.meals || []).map((x) => x.strArea).filter(Boolean);
}

// Helpers
export function parseIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal?.[`strIngredient${i}`];
    const meas = meal?.[`strMeasure${i}`];
    if (ing && ing.trim()) items.push({ ing: ing.trim(), meas: (meas || "").trim() });
  }
  return items;
}

export function tasteProfile(meal) {
  // This is a “suggested taste profile” based on metadata (not 100% factual).
  const area = (meal?.strArea || "").toLowerCase();
  const cat = (meal?.strCategory || "").toLowerCase();
  const tags = (meal?.strTags || "").toLowerCase();

  const notes = [];

  if (area.includes("indian")) notes.push("spicy", "aromatic", "warming");
  if (area.includes("thai")) notes.push("sweet-sour", "herby", "bold");
  if (area.includes("italian")) notes.push("savory", "herbal", "comforting");
  if (area.includes("mexican")) notes.push("smoky", "zesty", "spiced");

  if (cat.includes("dessert")) notes.push("sweet", "rich");
  if (cat.includes("seafood")) notes.push("light", "briny");
  if (tags.includes("spicy")) notes.push("hot");
  if (tags.includes("vegetarian")) notes.push("fresh", "earthy");

  const unique = [...new Set(notes)];
  if (!unique.length) return "Balanced, comforting, and satisfying.";
  return unique.slice(0, 4).join(" • ");
}

export function youtubeId(url) {
  if (!url) return null;
  const m1 = url.match(/[?&]v=([^&]+)/);
  if (m1) return m1[1];
  const m2 = url.match(/youtu\.be\/([^?]+)/);
  return m2 ? m2[1] : null;
}
