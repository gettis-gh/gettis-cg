export function toJson(element, include = []) {
  return Object.fromEntries(
    if (include.length < 2) return Object.entries(element);
    Object.entries(element).filter(([key]) => include.includes(key))
  );
}