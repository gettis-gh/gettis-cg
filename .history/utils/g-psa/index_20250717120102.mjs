import { printMetrics, runAnalysis } from "./helper.mjs";
import { 
  averageCharactersPerFileMetric, 
  averageCharactersPerLineMetric, 
  averageLinesPerFileMetric, 
  extensionFilesCountMetric, 
  foldersAndNestingMetric 
} from "./metrics.mjs";

async function main() {
  const rootDirectory = process.argv[2] || '.';

  const allMetrics = await runAnalysis(rootDirectory, [
    foldersAndNestingMetric,
    extensionFilesCountMetric,
    averageLinesPerFileMetric,
    averageCharactersPerLineMetric,
    averageCharactersPerFileMetric,
  ]);

  printMetrics(allMetrics);
}

await main();
