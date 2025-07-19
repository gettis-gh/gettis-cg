import { walk } from "./helper.mjs";

function aggregateStatistics(entries) {
  const stats = {
    folders: 0,
    maxNesting: 0,
    byExtension: {},
  };

  for (const entry of entries) {
    if (entry.type === 'folder') {
      stats.folders++;
      if (entry.level > stats.maxNesting) {
        stats.maxNesting = entry.level;
      }
    } else if (entry.type === 'file') {
      const ext = entry.extension;
      if (!stats.byExtension[ext]) {
        stats.byExtension[ext] = { files: 0, lines: 0, chars: 0 };
      }
      stats.byExtension[ext].files++;
      stats.byExtension[ext].lines += entry.linesCount;
      stats.byExtension[ext].chars += entry.charsCount;
    }
  }

  return stats;
}

function calculateAverages(stats) {
  const result = {
    folders: stats.folders,
    maxNesting: stats.maxNesting,
  };

  for (const [ext, data] of Object.entries(stats.byExtension)) {
    const { files, lines, chars } = data;
    result[ext] = {
      files,
      averageLinesPerFile: +(lines / files).toFixed(2),
      averageCharactersPerLine: +(chars / lines).toFixed(2),
      averageCharactersPerFile: +(chars / files).toFixed(2),
    };
  }

  return result;
}

async function runAnalysis(rootDirectory) {
  const entries = await walk(rootDirectory);
  const aggregatedStats = aggregateStatistics(entries);
  return calculateAverages(aggregatedStats);
}

const rootDirectory = process.argv[2] || '.';
const result = await runAnalysis(rootDirectory);
console.log(result);
