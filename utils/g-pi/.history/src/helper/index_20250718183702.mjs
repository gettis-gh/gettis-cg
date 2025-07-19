import { readFileSync, readdirSync, statSync } from 'fs';
import { basename, join } from 'path';

export function processFile(path, processors = []) {
  const name = basename(path);
  const content = readFileSync(path, 'utf8');

  const results = Object.assign(
    {}, 
    ...processors.map(
      processor => processor({ name, content, path })
    )
  );

  return results;
}

export function processDir(path, processors) {
  const elements = readdirSync(path);

  const results = elements.flatMap(
    name => {
      const elementPath = join(path, name);
      const elementStats = statSync(elementPath);

      if (elementStats.isDirectory()) {
        return processDir(elementPath, processors);
      }

      return [processFile(elementPath, processors)];
    }
  );

  return results.flat();
}

export function analyzeEntry(entries, meters = []) {

  const results = entries.map(
    entry => meters.map(
      meter => meter(entry)
    )
  );
  return results;
}