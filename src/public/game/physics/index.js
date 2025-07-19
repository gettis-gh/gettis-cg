import { radToVec } from "../math/index.js";

const requiredProps = ["position", "dimension", "rotation"];

function hasAllStateProps(obj) {
  if (obj?.state == null) return false;
  return requiredProps.every(prop => obj.state[prop] != null);
}

export function onCollision(obj1, obj2, solver) {
  if (!hasAllStateProps(obj1) || !hasAllStateProps(obj2)) return;

  const obj1Axes = Object.values(radToVec(obj1.state.rotation))//.map(normalize);
  const obj2Axes = Object.values(radToVec(obj2.state.rotation))//.map(normalize);

  const axesToTest = [...obj1Axes, ...obj2Axes];

  let minOverlap = Infinity;
  let minAxis = null;

  for (const axis of axesToTest) {
    const [ obj1Min, obj1Max ] = projectObb(obj1, obj1Axes, axis);
    const [ obj2Min, obj2Max ] = projectObb(obj2, obj2Axes, axis);
    const overlap = getOverlap(obj1Min, obj1Max, obj2Min, obj2Max);
    if (!overlap) return { collision: false, overlap: undefined, axis: undefined };
    if (overlap >= minOverlap) continue;

    minOverlap = overlap;
    minAxis = axis;
  };

  if (minAxis !== null) {
    const centerVector = Object.keys(obj1.state.position).map(
      key => {
        const pos1 = obj1.state.position[key];
        const pos2 = obj2.state.position[key];
        return pos2 - pos1;
      }
    );
    
    if (dot(centerVector, minAxis) < 0) {
    minAxis = negate(minAxis);
    }
    
    minAxis = normalize(minAxis);
  }

  solver({ collision: true, overlap: minOverlap, axis: minAxis });
}

function projectObb(obj, axes, axis) {
  const projectedCenter = dot(Object.values(obj.state.position), axis);
  let radius = 0;

  for (let index = 0; index < axes.length; index += 1) {
    radius += Math.abs(dot(axes[index], axis)) * Object.values(obj.state.dimension)[index];
  }

  return [projectedCenter - radius, projectedCenter + radius];
}   

function dot(a, b) {
  if (a.length !== b.length) {
    throw new Error("Vectors must be the same length");
  }
  
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function normalize(v) {
  const len = Math.sqrt(dot(v, v));
  return len === 0 ? [0, 0, 0] : v.map(x => x / len);
}
  
function getOverlap(minA, maxA, minB, maxB) {
  return Math.min(maxA, maxB) - Math.max(minA, minB);
}

function negate(v) {
  return v.map(x => -x);
}