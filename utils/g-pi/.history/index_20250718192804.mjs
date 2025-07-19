import { processors } from './src/processors/index.mjs';
import { processFile, processDir, analyzeEntry, safeCombine } from './src/helper/index.mjs';
import { meters } from './src/meters/index.mjs';
import { toJson } from './src/prettifier';

function main() {
  // init
  const filePath = "index.mjs";
  const dirPath = "src";

  // process
  const processResult = processDir(dirPath, processors);
  const analysisResult = analyzeEntry(processResult, meters);
  
  const results = safeCombine(processResult, analysisResult);

  // display analysis
  console.log(toJson(results, ["Average Char Per Line"]));
  //console.log(processResult, analysisResult)
}

main();