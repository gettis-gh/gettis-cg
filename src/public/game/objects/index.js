export function updateBox(group, properties = {}) {
  if (!group) return;
    
  const rect = group.querySelector('rect');
  if (!rect) return;

  for (const [key, value] of Object.entries(properties)) {
    rect.setAttribute(key, value);
  }
}
