import { processors } from './src/processors/index.mjs';
import { processFile, processDir, analyzeEntry, safeCombine } from './src/helper/index.mjs';
import { meters } from './src/meters/index.mjs';

function main() {
  // init
  const filePath = "index.mjs";
  const dirPath = "src";

  // process
  const processResult = processDir(dirPath, processors);
  const analysisResult = analyzeEntry(processResult, meters);
  
  const results = safeCombine(processResult, analysisResult);

  // display analysis
  console.log(results);
  //console.log(processResult, analysisResult)
}

main();