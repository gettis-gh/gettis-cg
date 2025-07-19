import { processFile } from './helper/index.js';

function main() {
  // init
  const path = "index.mjs";

  // get analisis
  const result = processFile(path, processors);

  // display analisis
  console.log(result);
}

main();