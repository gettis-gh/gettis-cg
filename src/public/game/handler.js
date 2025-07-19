export const actionHandler = {
  move({ position }, { newX, newY, newZ }) {
    position.x = newX;
    position.y = newY;
    position.z = newZ;
  },
  rotate({ rotation }, newAngle) {
    rotation.y = newAngle;
  }
};

export const keybinds = {
  w: (handler, object) => {
    if (!('move' in handler)) return;
    
    const angle = object.rotation.y; // en radianes
    const step = 1;
    
    const dx = Math.sin(angle) * step;
    const dz = Math.cos(angle) * step;
    
    handler.move(object, {
      newX: object.position.x + dx,
      newY: object.position.y,
      newZ: object.position.z + dz
    });
  },
  s: (handler, object) => {
    if (!('move' in handler)) return;
    
    const angle = object.rotation.y;
    const step = -1;
    
    const dx = Math.sin(angle) * step;
    const dz = Math.cos(angle) * step;
    
    handler.move(object, {
      newX: object.position.x + dx,
      newY: object.position.y,
      newZ: object.position.z + dz
    });
  },    
  space: (handler, object) => {
    if (!('move' in handler)) return;
    handler.move(object, {
      newX: object.position.x,
      newY: object.position.y + 1,
      newZ: object.position.z
    });
  },
  c: (handler, object) => {
    if (!('move' in handler)) return;
    handler.move(object, {
      newX: object.position.x,
      newY: object.position.y + -1,
      newZ: object.position.z
    });
  },
  e: (handler, object) => {
    if (!('rotate' in handler)) return;
    handler.rotate(object, object.rotation.y + -0.1);
  },
  q: (handler, object) => {
    if (!('rotate' in handler)) return;
    handler.rotate(object, object.rotation.y + 0.1);
  },
};