import { processors } from './processors/index.js';
import { processFile, processDir } from './helper/index.js';

function main() {
  // init
  const filePath = "index.mjs";

  // get analisis
  const result = processFile(filePath, processors);

  // display analisis
  console.log(result);
}

main();