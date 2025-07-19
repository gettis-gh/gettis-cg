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

  // Preprocesar datos comunes para evitar repetir en cada función
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

  // Objeto con todo para pasar a cada métrica
  const context = { entries, byExtension };

  // Ejecutar todas las métricas y combinar resultados
  return metricFunctions.reduce((acc, fn) => {
    const partialResult = fn(context);
    return { ...acc, ...partialResult };
  }, {});
}

export function mergeExtensionMetrics(metricsArray) {
  const merged = {};
  for (const metric of metricsArray) {
    for (const [ext, data] of Object.entries(metric)) {
      if (!merged[ext]) merged[ext] = {};
      Object.assign(merged[ext], data);
    }
  }
  return merged;
}

export function printMetrics(metrics) {
  const lines = new Set();
  Object.entries(metrics).forEach(
    ([key, value]) => {
      if (typeof value !== 'object') {
        return console.log(`${key} is not an object`);
      }

      //console.log(value.toString());

      const line = `${value.toString()}`;

      if (Object.keys(value).length <= 2) {
        return lines.add(line);
      }

      Object.entries(value).forEach(
        ([key, value]) => {
          if (typeof value !== 'object') return;
          line += ` | ${value.toString()}`;
        }
      );

      lines.add(line);
    }
  );
  console.log(lines);
}
