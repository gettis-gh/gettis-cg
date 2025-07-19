import { walk } from "./helper.mjs";

async function runAnalysis(rootDirectory, metricFunctions = []) {
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

// Métricas como funciones que reciben contexto y retornan objetos

const foldersAndNestingMetric = ({ entries }) => {
  let folders = 0;
  let maxNesting = 0;
  for (const entry of entries) {
    if (entry.type === 'folder') {
      folders++;
      if (entry.level > maxNesting) maxNesting = entry.level;
    }
  }
  return { folders, maxNesting };
};

const extensionFilesCountMetric = ({ byExtension }) => {
  // Solo devuelve files count para cada extensión
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[ext] = { files: stats.files };
  }
  return result;
};

const averageLinesPerFileMetric = ({ byExtension }) => {
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[ext] = { averageLinesPerFile: +(stats.lines / stats.files).toFixed(2) };
  }
  return result;
};

const averageCharactersPerLineMetric = ({ byExtension }) => {
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[ext] = { averageCharactersPerLine: +(stats.chars / stats.lines).toFixed(2) };
  }
  return result;
};

const averageCharactersPerFileMetric = ({ byExtension }) => {
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[ext] = { averageCharactersPerFile: +(stats.chars / stats.files).toFixed(2) };
  }
  return result;
};

// Tabla unificada de métricas para extensión

function mergeExtensionMetrics(metricsArray) {
  const merged = {};
  for (const metric of metricsArray) {
    for (const [ext, data] of Object.entries(metric)) {
      if (!merged[ext]) merged[ext] = {};
      Object.assign(merged[ext], data);
    }
  }
  return merged;
}

async function main() {
  const rootDirectory = process.argv[2] || '.';

  const allMetrics = await runAnalysis(rootDirectory, [
    foldersAndNestingMetric,
    // Para métricas por extensión se ejecutan todas y luego se fusionan:
    context => mergeExtensionMetrics([
      extensionFilesCountMetric(context),
      averageLinesPerFileMetric(context),
      averageCharactersPerLineMetric(context),
      averageCharactersPerFileMetric(context),
    ]),
  ]);

  console.table(
    Object.entries(allMetrics).map(([key, value]) =>
      typeof value === 'object'
        ? { Extension_or_Stat: key, ...value }
        : { Extension_or_Stat: key, Value: value }
    )
  );
}

await main();
