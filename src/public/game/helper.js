function normalizeKey(key) {
  if (key === ' ' || key === 'Spacebar') return 'space';
  return key.toLowerCase();
}

export function startKeyListener(pressedKeyContainer) {
  document.addEventListener('keydown', (e) => {
    const k = normalizeKey(e.key);
    if (pressedKeyContainer.has(k)) return;
    pressedKeyContainer.add(k);
  });
    
  document.addEventListener('keyup', (e) => {
    const k = normalizeKey(e.key);
    if (!pressedKeyContainer.has(k)) return;
    pressedKeyContainer.delete(k);
  });
}

