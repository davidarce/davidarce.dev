export const THEMES = [
  { id: "system", label: "System" },
  { id: "light", label: "Light" },
  { id: "matrix", label: "Matrix" },
  { id: "ocean", label: "Ocean" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const KEY = "theme";

export function getTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(KEY);
    if (THEMES.some((t) => t.id === saved)) return saved as ThemeId;
  } catch {
    // storage unavailable
  }
  return "system";
}

export function setTheme(id: ThemeId): void {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    // storage unavailable
  }
  document.documentElement.setAttribute("data-theme", id);
  window.dispatchEvent(new CustomEvent("themechange", { detail: id }));
}
