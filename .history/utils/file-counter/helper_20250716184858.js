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
    await walk(entryPath, level + 1);
  } else {
    await processFile(entryPath);
  }
}

export async function walk(dir, level = 0) {
  counts.folders++;
  counts.maxNesting = Math.max(counts.maxNesting, level);

  const entries = await readdir(dir);
  await Promise.all(entries.map(f => processEntry(join(dir, f), level)));
}