import { processors } from './src/processors/index.mjs';
import { processFile, processDir } from './src/helper/index.mjs';

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