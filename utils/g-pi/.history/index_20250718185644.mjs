import { processors } from './src/processors/index.mjs';
import { processFile, processDir, analyzeEntry, safeCombine } from './src/helper/index.mjs';
import { meters } from './src/meters/index.mjs';

function main() {
  // init
  const filePath = "index.mjs";
  const dirPath = "src";

  // get analisis
  const processResult = processDir(dirPath, processors);
  const analisisResult = analyzeEntry(processResult, meters);
  
  const results = safeCombine(processResult, analisisResult);

  // display analisis
  console.log(result);
}

main();