import { statSync } from "fs";
import { messages } from "./utils.js";
import { analyzeEntry, processFile } from "../src/helper/index.mjs";
import { meters } from "../src/meters/index.js";
import { processors } from "../src/processors/index.js";

export function analyze({ path, ignore=[], include=[] }) {
  if (!validPath(path)) return messages.invalidInput("Path");

  const typeofPath = (path) => statSync(path).isDirectory() ? "folder" : "file";

  let processed = undefined;
  let analyzed = undefined;

  if (typeofPath(path) == "file") {
    processed = processFile(path, processors);
  } else if (typeofPath(path) == "folder") {
    processed = processDir(path, processors);
  } else return messages.invalidInput("Path");

  analyzed = analyzeEntry(processed, meters);

  return messages.ok("Analysis done successfully", safeCombine(processed, analyzed));
}