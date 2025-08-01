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
