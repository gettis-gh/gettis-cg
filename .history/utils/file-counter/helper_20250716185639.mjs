import { readdir, stat, readFile } from 'fs/promises';
import { join, extname } from 'path';

async function processFile(filePath) {
  const ext = extname(filePath) || 'no_ext';
  const content = await readFile(filePath, 'utf8');
  const lines = content.split('\n');

  if (!counts[ext]) counts[ext] = { files: 0, lines: 0, chars: 0 };
  counts[ext].files++;
  counts[ext].lines += lines.length;
  counts[ext].chars += content.length;
}

async function processEntry(entryPath, level) {
  const s = await stat(entryPath);
  if (s.isDirectory()) {
    await walkDir(entryPath, level + 1);
  } else {
    await processFile(entryPath);
  }
}

async function walkDir(dir, level) {
  counts.folders++;
  counts.maxNesting = Math.max(counts.maxNesting, level);

  const entries = await readdir(dir);
  await Promise.all(entries.map(name => processEntry(join(dir, name), level)));
}

export async function walk(rootDir) {
  const counts = {
    folders: 0,
    maxNesting: 0,
  };

  await walkDir(rootDir, 0);
  return counts;
}