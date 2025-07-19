import { processors } from './processors/index.mjs';
import { processFile, processDir } from './helper/index.mjs';

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