import { processors } from './src/processors/index.js';
import { processFile, processDir, analyzeEntry, safeCombine } from './src/helper/index.js';
import { meters } from './src/meters/index.js';
import { toJson } from './src/prettifier/index.js';

function main() {
  // init
  const filePath = "index.mjs";
  const dirPath = "src";

  // process
  const processResult = processDir(dirPath, processors);
  const analysisResult = analyzeEntry(processResult, meters);
  
  const results = safeCombine(processResult, analysisResult);

  // display analysis
  console.log(
    results.map(
      result => toJson(result, ["Average Char Per Line"])
    )
  );
}

main();