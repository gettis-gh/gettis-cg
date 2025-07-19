import { processors } from './processors/index.js';
import { processFile, processDir } from './helper/index.js';

function main() {
  // init
  const filePath = "index.mjs";
  const dirPath = ".";

  // get analisis
  const result = processDir(dirPath, processors);

  // display analisis
  console.log(result);
}

main();