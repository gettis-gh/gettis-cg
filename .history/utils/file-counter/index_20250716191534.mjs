import { walk } from "./helper.mjs";
import { averageCharactersPerFileMetric, averageCharactersPerLineMetric, averageLinesPerFileMetric, extensionFilesCountMetric, foldersAndNestingMetric } from "./metrics.mjs";

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
