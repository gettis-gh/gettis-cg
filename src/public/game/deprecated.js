export const actionHandler = {
  move(object, { newX, newY, newZ }) {
    object.position.x = newX;
    object.position.y = newY;
    object.position.z = newZ;
    object.console.log(object)
  },
  rotate({ rotation }, newAngle) {
    rotation.y = newAngle;
  }
};

export const keybinds = {
  w: (handler, object) => {
    if (!('move' in handler)) return;
    handler.move(object, {
      newX: 0,
      newY: 0,
      newZ: 1
    });
  },
  s: (handler, object) => {
    if (!('move' in handler)) return;
    handler.move(object, {
      newX: 0,
      newY: 0,
      newZ: -1
    });
  },
  space: (handler, object) => {
    if (!('move' in handler)) return;
    handler.move(object, {
      newX: 0,
      newY: 1,
      newZ: 0
    });
  },
  c: (handler, object) => {
    if (!('move' in handler)) return;
    handler.move(object, {
      newX: 0,
      newY: -1,
      newZ: 0
    });
  },
  e: (handler, object) => {
    if (!('rotate' in handler)) return;
    handler.rotate(object, 0.1);
  },
};

function normalizeKey(key) {
  if (key === ' ') return 'Space';
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

