// helper.mjs
import { readdir, stat, readFile } from 'fs/promises';
import { join, extname } from 'path';

export async function walk(rootDir) {
  const entries = [];
  await walkDir(rootDir, 0, entries);
  return entries;
}

async function walkDir(dir, level, entries) {
  entries.push({ type: 'folder', path: dir, level });

  const names = await readdir(dir);
  await Promise.all(
    names.map(name => processEntry(join(dir, name), level, entries))
  );
}

async function processEntry(entryPath, level, entries) {
  const s = await stat(entryPath);
  if (s.isDirectory()) {
    await walkDir(entryPath, level + 1, entries);
  } else {
    await processFile(entryPath, s, entries, level);
  }
}

async function processFile(filePath, statObj, entries, level) {
  const ext = extname(filePath) || 'no_ext';
  const content = await readFile(filePath, 'utf8');
  const linesCount = content.split('\n').length;
  const charsCount = content.length;

  entries.push({
    type: 'file',
    path: filePath,
    level,
    extension: ext,
    size: statObj.size,
    linesCount,
    charsCount,
  });
}
