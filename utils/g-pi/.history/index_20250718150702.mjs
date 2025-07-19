import { processors } from './processors/index.js';
import { processFile } from './helper/index.js';

function main() {
  // init
  const path = "index.mjs";

  // get analisis
  const result = processFile('index.mjs', processors);

  // display analisis
  console.log(result);
}

main();