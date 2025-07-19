import { readFileSync } from 'fs';
import { basename } from 'path';

const avgLineLength = (content) => {
  const lines = content.split('\n');
  const avg = lines.reduce((acc, line) => acc + line.length, 0) / lines.length;
  return { "Average Line Length": avg };
};

const processors = [
  avgLength
];

function processFile(path, processors = []) {
  const name = basename(path);
  const content = readFileSync(path, 'utf8');

  const results = Object.assign(
    {}, 
    ...processors.map(
      processor => processor(name, content)
    )
  );

  return results;
}

function main() {
  // init

  // get analisis
  const result = processFile('index.mjs');

  // display analisis
  console.log(result);
}

main();