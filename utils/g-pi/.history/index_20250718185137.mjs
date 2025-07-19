import { processors } from './src/processors/index.mjs';
import { processFile, processDir, analyzeEntry } from './src/helper/index.mjs';
import { meters } from './src/meters/index.mjs';

function main() {
  // init
  const filePath = "index.mjs";
  const dirPath = "src";

  // get analisis
  const result = processDir(dirPath, processors);
  const stats = analyzeEntry(result, meters);

  // display analisis
  console.log(stats);
}

main();