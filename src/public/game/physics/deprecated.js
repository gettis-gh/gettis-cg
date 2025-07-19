export function onCollision(a, b, cb) {
  const toCorners = o => {
  const {x, y, angle, width: w, height: h} = o.state;
  const dx = w/2, dy = h/2;
  const c = Math.cos(angle), s = Math.sin(angle);
  return [[-dx,-dy],[dx,-dy],[dx,dy],[-dx,dy]].map(([px, py]) => ({
    x: x + px * c - py * s,
    y: y + px * s + py * c
  }));
  };
  const proj = (pts, ax, ay) => {
  let [min, max] = [Infinity, -Infinity];
  for (const p of pts) {
    const dot = p.x * ax + p.y * ay;
    min = Math.min(min, dot);
    max = Math.max(max, dot);
  }
  return [min, max];
  };
  const overlap = (a1,a2,b1,b2) => !(a2 < b1 || b2 < a1);
  const axes = (pts) => pts.map((p, i, a) => {
  const q = a[(i+1)%4];
  const dx = q.x - p.x, dy = q.y - p.y;
  const len = Math.hypot(dx, dy);
  return {x: -dy/len, y: dx/len}; // normal
  }).slice(0,2);

  const pa = toCorners(a), pb = toCorners(b);
  const allAxes = [...axes(pa), ...axes(pb)];
  let minOverlap = Infinity;
  let mtvAxis = null;

  for (const ax of allAxes) {
    const [minA, maxA] = proj(pa, ax.x, ax.y);
    const [minB, maxB] = proj(pb, ax.x, ax.y);
    if (!overlap(minA, maxA, minB, maxB)) return;
      
    const o = Math.min(maxA, maxB) - Math.max(minA, minB);
      
    const dx = b.state.x - a.state.x;
    const dy = b.state.y - a.state.y;
    const direction = (dx * ax.x + dy * ax.y) < 0 ? -1 : 1;
    const adjustedAxis = { x: ax.x * direction, y: ax.y * direction };
      
    if (o < minOverlap) {
    minOverlap = o;
    mtvAxis = adjustedAxis;
    }
  }

  cb({
  axis: mtvAxis,
  depth: minOverlap,
  });
}
  