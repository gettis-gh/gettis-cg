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

  const results = elements.map(
    name => {
      const elementPath = join(path, name);
      const elementStats = statSync(elementPath);

      if (elementStats.isDirectory()) {
        return processDir(elementPath, processors);
      }

      return processFile(elementPath, processors)
    }
  );

  return results;
}