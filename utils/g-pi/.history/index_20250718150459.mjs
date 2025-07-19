import { readFileSync } from 'fs';
import { basename } from 'path';
import { processors } from './processors/index.js';

function processFile(path, processors = []) {
  const name = basename(path);
  const content = readFileSync(path, 'utf8');

  const results = Object.assign(
    {}, 
    ...processors.map(
      processor => processor({ name, content })
    )
  );

  return results;
}

function main() {
  // init

  // get analisis
  const result = processFile('index.mjs', processors);

  // display analisis
  console.log(result);
}

main();