export function toJson(element, include = []) {
  return Object.fromEntries(
    Object.entries(element).filter(([key]) => include.includes(key))
  );
}