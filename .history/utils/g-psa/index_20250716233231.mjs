import { mergeMetrics, printMetrics, runAnalysis, walk } from "./helper.mjs";
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
  console.log('Found entries:', entries.length);

  const allMetrics = await runAnalysis(rootDirectory, [
    context => mergeMetrics([
      foldersAndNestingMetric(context),
      extensionFilesCountMetric(context),
      averageLinesPerFileMetric(context),
      averageCharactersPerLineMetric(context),
      averageCharactersPerFileMetric(context),
    ]),
  ]);

  printMetrics(allMetrics);
}

await main();
