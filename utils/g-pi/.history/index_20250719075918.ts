import { processors } from './src/processors/index.mjs';
import { processFile, processDir, analyzeEntry, safeCombine } from './src/helper/index.mjs';
import { meters } from './src/meters/index.mjs';
import { toJson } from './src/prettifier/index.mjs';

// Define interfaces genéricas para los datos que manejas
interface ProcessResult {
  // Ajusta estas propiedades según lo que devuelva processDir
  [key: string]: any;
}

interface AnalysisResult {
  // Ajusta según analyzeEntry
  [key: string]: any;
}

type Result = ProcessResult | AnalysisResult;

function main(): void {
  // init
  const filePath: string = "index.mjs";
  const dirPath: string = "src";

  // process
  const processResult: ProcessResult = processDir(dirPath, processors);
  const analysisResult: AnalysisResult = analyzeEntry(processResult, meters);
  
  const results: Result[] = safeCombine(processResult, analysisResult);

  // display analysis
  console.log(
    results.map(
      (result: Result) => toJson(result, ["Average Char Per Line"])
    )
  );
}

main();
