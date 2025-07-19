import { messages } from "./utils.js";

export function analyze({ path, ignore=[], include=[] }) {
  if (!validPath(path)) return messages.invalidInput("Path");
}