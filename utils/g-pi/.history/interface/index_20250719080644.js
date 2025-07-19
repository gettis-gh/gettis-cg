import { statSync } from "fs";
import { messages } from "./utils.js";
import { analyzeEntry, processFile } from "../src/helper/index.mjs";

export function analyze({ path, ignore=[], include=[] }) {
  if (!validPath(path)) return messages.invalidInput("Path");

  const typeofPath = (path) => statSync(path).isDirectory() ? "folder" : "file";

  let processed = undefined;
  let analyzed = undefined;

  if (typeofPath(path) == "file") {
    processed = processFile(path);
  } else if (typeofPath(path) == "folder") {
    processed = processDir(path);
  } else return messages.invalidInput("Path");

  analyzed = analyzeEntry(processed);
}