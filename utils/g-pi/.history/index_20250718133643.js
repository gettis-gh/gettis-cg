import { readFileSync } from 'fs';
import { basename } from 'path';

function processFile(path, processors = []) {
  const name = basename(path);
  const content = readFileSync(filePath, 'utf8');

  const results = Object.assign(
    {}, 
    ...processors.map(
      processor => {
        const result = processor(name, content);
        if (typeof result !== 'object') return;
        return result;
      }
    )
  );

  return results;
}

function main() {
  // init
  // get analisis
  // display analisis
}

main();