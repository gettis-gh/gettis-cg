import { mergeExtensionMetrics, printMetrics, runAnalysis } from "./helper.mjs";
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
    context => mergeExtensionMetrics([
      foldersAndNestingMetric(context),
      extensionFilesCountMetric(context),
      averageLinesPerFileMetric(context),
      averageCharactersPerLineMetric(context),
      averageCharactersPerFileMetric(context),
    ]),
  ]);

  await printMetrics(allMetrics);
}

await main();
