import { walk } from "./helper.mjs";

function calculateAverages(rawStatsByExtension) {
  return Object.entries(rawStatsByExtension).reduce((acc, [extension, stats]) => {
    if (extension === 'folders' || extension === 'maxNesting') {
      acc[extension] = stats;
    } else {
      acc[extension] = calculateAveragesForExtension(stats);
    }
    return acc;
  }, {});
}

function calculateAveragesForExtension(stats) {
  const { files, lines, chars } = stats;
  return {
    files,
    averageLinesPerFile: +(lines / files).toFixed(2),
    averageCharactersPerLine: +(chars / lines).toFixed(2),
    averageCharactersPerFile: +(chars / files).toFixed(2),
  };
}

async function runAnalysis(rootDirectory) {
  const rawStatistics = await walk(rootDirectory);
  return calculateAverages(rawStatistics);
}

const rootDirectory = process.argv[2] || '.';
const result = await runAnalysis(rootDirectory);
console.log(result);

