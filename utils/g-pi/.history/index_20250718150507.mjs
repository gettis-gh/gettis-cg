import { readFileSync } from 'fs';
import { basename } from 'path';
import { processors } from './processors/index.js';

function main() {
  // init

  // get analisis
  const result = processFile('index.mjs', processors);

  // display analisis
  console.log(result);
}

main();