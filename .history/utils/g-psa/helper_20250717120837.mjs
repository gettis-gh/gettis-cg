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
  const lines = content.split('\n');
  const linesCount = lines.length;
  const charsCount = content.length;
  const indentations = lines.map(line => {
    const match = line.match(/^\s*/);
    return match ? match[0].length : 0;
  });

  entries.push({
    type: 'file',
    path: filePath,
    level,
    extension: ext,
    size: statObj.size,
    linesCount,
    charsCount,
    indentations,
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
    // Para cada key (como "indentations"), juntar todos sus valores (que pueden ser objetos con más objetos)

    const parts = [];

    values.forEach(v => {
      // Si el objeto tiene un toString propio (que no sea Object.prototype.toString), usarlo
      if (typeof v?.toString === 'function' && v.toString !== Object.prototype.toString) {
        parts.push(v.toString());
      } else {
        // Si no tiene toString o es objeto anidado, recorremos sus propiedades y llamamos a toString
        Object.values(v).forEach(subval => {
          if (subval && typeof subval.toString === 'function' && subval.toString !== Object.prototype.toString) {
            parts.push(subval.toString());
          }
        });
      }
    });

    console.log(`${key}: ${parts.join(' | ')}`);
  }
}
