import { statSync } from "fs";
import { messages } from "./utils.js";
import { analyzeEntry, processDir, processFile, safeCombine } from "../src/helper/index.mjs";
import { meters } from "../src/meters/index.mjs";
import { processors } from "../src/processors/index.mjs";

namespace Parameters {
  export interface Analyze {
    path: string;
    ignore?: string[];
    include?: string[];
  }
}

function validPath(path): boolean {
  return true;
}

export function analyze({ path, ignore=[], include=[] }: Parameters.Analyze) {
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