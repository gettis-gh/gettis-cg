import { readFileSync, readdirSync, statSync } from 'fs';
import { basename } from 'path';

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
      const stats = statSync(element);

      if 
    }
  );
}