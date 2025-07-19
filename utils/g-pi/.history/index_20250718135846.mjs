import { readFileSync } from 'fs';
import { basename } from 'path';

const avgCharPerLine = ({ content }) => {
  const lines = content.split('\n');
  const avg = lines.reduce((acc, line) => acc + line.length, 0) / lines.length;
  return { "Average Char Per Line": avg };
};

const maxCharPerLine = ({ content }) => {

};

const processors = [
  avgCharPerLine,
  maxCharPerLine
];

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