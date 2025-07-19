import { walk } from "./helper.mjs";

const rootDirectory = process.argv[2] || '.';
const statisticsByExtension = await walk(rootDirectory);

for (const extension in statisticsByExtension) {
  if (extension === 'folders' || extension === 'maxNesting') continue;

  const { files, lines, chars } = statisticsByExtension[extension];
  statisticsByExtension[extension] = {
    files,
    averageLinesPerFile: +(lines / files).toFixed(2),
    averageCharactersPerLine: +(chars / lines).toFixed(2),
    averageCharactersPerFile: +(chars / files).toFixed(2),
  };
}

console.log(statisticsByExtension);
