const KEY = "prochef_recent_searches";

export function saveSearch(query) {
  const q = query.trim();
  if (!q) return;
  const list = loadSearches().filter(x => x.toLowerCase() !== q.toLowerCase());
  list.unshift(q);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 10)));
}

export function loadSearches() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}
