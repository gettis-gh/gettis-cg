import { statSync } from "fs";
import { messages } from "./utils.js";

export function analyze({ path, ignore=[], include=[] }) {
  if (!validPath(path)) return messages.invalidInput("Path");

  const typeofPath = (path) => statSync(path).isDirectory() ? "folder" : "file";

  if (isFile(path)) {

  } else if () {

  }
}