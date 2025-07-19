import { readFileSync } from 'fs';
import { basename } from 'path';

const avgCharPerLine = ({ content }) => {
  const lines = content.split('\n');
  const avg = lines.reduce((acc, line) => acc + line.length, 0) / lines.length;
  return { "Average Char Per Line": avg };
};

const maxCharPerLine = ({ content }) => {
  const lines = content.split('\n');
  const max = lines.reduce((maxLen, line) => Math.max(maxLen, line.length), 0);
  return { "Max Char Per Line": max };
};

const metters = [
  avgCharPerLine,
  maxCharPerLine
];

const countLines = ({ content  }) => {
  const lines = content.split('\n');
  return { "Lines": lines.length };
};

const countChars = ({ content }) => {
  return { "Chars": content.length };
};

const processors = [
  countLines,
  countChars
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