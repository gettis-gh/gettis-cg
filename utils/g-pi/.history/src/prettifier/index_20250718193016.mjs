export function toJson(element, include = []) {
  if (include.length < 1) return Object.entries(element);
  return Object.fromEntries(
    Object.entries(element).filter(([key]) => include.includes(key))
  );
}