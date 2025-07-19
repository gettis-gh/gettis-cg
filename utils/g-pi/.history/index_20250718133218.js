import { readFileSync } from 'fs';
import { basename } from 'path';

function processFile(path, processors = []) {
  const name = basename(path);
  const content = readFileSync(filePath, 'utf8');

  const results = Object.fromEntries(processors.map(
    processor => processor(name, content)
  ));

  return results;
}

function main() {
  // init
  // get analisis
  // display analisis
}

main();