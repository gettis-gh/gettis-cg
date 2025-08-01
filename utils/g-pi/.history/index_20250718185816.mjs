import { processors } from './src/processors/index.mjs';
import { processFile, processDir, analyzeEntry, safeCombine } from './src/helper/index.mjs';
import { meters } from './src/meters/index.mjs';

function main() {
  // init
  const filePath = "index.mjs";
  const dirPath = "src";

  // get analysis
  const processResult = processDir(dirPath, processors);
  const analiysisResult = analyzeEntry(processResult, meters);
  
  const results = safeCombine(processResult, analysisResult);

  // display analisis
  console.log(result);
}

main();