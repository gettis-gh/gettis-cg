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

export async function runAnalysis(rootDirectory, metricFunctions = []) {
  const entries = await walk(rootDirectory);

  const byExtension = entries.reduce((acc, entry) => {
    if (entry.type === 'file') {
      const ext = entry.extension;
      if (!acc[ext]) acc[ext] = { files: 0, lines: 0, chars: 0 };
      acc[ext].files++;
      acc[ext].lines += entry.linesCount;
      acc[ext].chars += entry.charsCount;
    }
    return acc;
  }, {});

  const context = { entries, byExtension };

  // Ejecutar cada función de métrica y devolver sus resultados en un array
  return metricFunctions.map(fn => fn(context));
}

export function printMetrics(metricsArray) {
  const grouped = new Map();

  metricsArray.forEach(metric => {
    Object.entries(metric).forEach(([key, value]) => {
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(value);
    });
  });

  for (const [key, values] of grouped) {
    const parts = values.map(v => {
      if (typeof v?.toString === 'function') return v.toString();
      return '';
    }).filter(Boolean);

    console.log(`${parts.join(' | ')}`);
  }
}

