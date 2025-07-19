export function radToVec(radRotation) {
  const vecRotation = {};
  Object.keys(radRotation).forEach(
    axis => {
      const rad = radRotation[axis];
      vecRotation[axis] = rotationHandlerTable[axis](rad);
    }
  );
  return vecRotation
}

const rotationHandlerTable = {
  x(rad) {
    return [0, Math.cos(rad), Math.sin(rad)];
  },
  y(rad) {
    return [Math.cos(rad), 0, Math.sin(rad)];
  },
  z(rad) {
    return [Math.cos(rad), Math.sin(rad), 0];
  }
}