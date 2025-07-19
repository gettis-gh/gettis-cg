import { readFileSync } from 'fs';
import { basename } from 'path';

function processFile(path, processors = []) {
  const name = basename(path);
  const content = readFileSync(filePath, 'utf8');

  const results = processors.map(
    processor => {
      
    }
  );
}

function main() {
  // init
  // get analisis
  // display analisis
}

main();