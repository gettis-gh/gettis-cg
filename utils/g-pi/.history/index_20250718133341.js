import { readFileSync } from 'fs';
import { basename } from 'path';

function processFile(path, processors = []) {
  const name = basename(path);
  const content = readFileSync(filePath, 'utf8');

  const entries = processors.map(processor => {
    const obj = processor(name, content);
    // Obtengo el primer par [key, value] del objeto
    return Object.entries(obj)[0];
  });

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