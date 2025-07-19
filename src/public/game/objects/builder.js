import { createElementNS } from "../../helper/index.js";
import { updateBox } from "./updater.js";

export function buildBox(properties = {}) {
  const rect = createElementNS("rect");
  const group = createElementNS("g");
  group.appendChild(rect);

  updateBox(group, {
    x: 50,
    y: 50,
    width: 1,
    height: 1,
    fill: 'steelblue',
    stroke: 'black',
    ...properties
  });

  return group;
}