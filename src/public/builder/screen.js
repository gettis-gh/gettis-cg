import { createElementNS } from "../helper/index.js";

export function buildScreen() {
  const wrapper = createElementNS('svg', {
    class: 'screen',
  });

  return wrapper;
}