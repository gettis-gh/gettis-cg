import { processors } from './src/processors/index.mjs';
import { processFile, processDir, analyzeEntry } from './src/helper/index.mjs';
import { meters } from './src/meters/index.mjs';

function main() {
  // init
  const filePath = "index.mjs";
  const dirPath = "src";

  // get analisis
  const processResult = processDir(dirPath, processors);
  const stats = analyzeEntry(result, meters);
  
  const results = processResult.map((item, index) => item.concat(stats[index]));

  // display analisis
  console.log(stats);
}

main();