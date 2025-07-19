import { printMetrics, runAnalysis, walk } from "./helper.mjs";
import { 
  averageCharactersPerFileMetric, 
  averageCharactersPerLineMetric, 
  averageLinesPerFileMetric, 
  extensionFilesCountMetric, 
  foldersAndNestingMetric 
} from "./metrics.mjs";

async function main() {
  const rootDirectory = process.argv[2] || '.';

  const entries = await walk(rootDirectory);

  const allMetrics = await runAnalysis(rootDirectory, [
    context => [
      foldersAndNestingMetric(context),
      extensionFilesCountMetric(context),
      averageLinesPerFileMetric(context),
      averageCharactersPerLineMetric(context),
      averageCharactersPerFileMetric(context),
    ],
  ]);

  console.log(allMetrics)
  printMetrics(allMetrics);
}

await main();
