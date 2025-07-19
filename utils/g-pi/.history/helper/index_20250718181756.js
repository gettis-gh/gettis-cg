import { readFileSync, readdirSync, statSync } from 'fs';
import { basename, join } from 'path';

export function processFile(path, processors = []) {
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

export function processDir(path, processors) {
  const elements = readdirSync(path);

  const processed = elements.map(
    element => {
      const elementStats = statSync(element);

      if (elementStats.isDirectory()) {
        return processDir()
      }
    }
  );
}