export const foldersAndNestingMetric = ({ entries }) => {
  const result = {
    folders: 0,
    maxNesting: 0
  };
  let folders = 0;
  let maxNesting = 0;
  for (const entry of entries) {
    if (entry.type === 'folder') {
      folders++;
      if (entry.level > maxNesting) maxNesting = entry.level;
    }
  }
  return { folders, maxNesting };
};

export const extensionFilesCountMetric = ({ byExtension }) => {
  // Solo devuelve files count para cada extensión
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[ext] = { files: stats.files };
  }
  return result;
};

export const averageLinesPerFileMetric = ({ byExtension }) => {
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[ext] = { averageLinesPerFile: +(stats.lines / stats.files).toFixed(2) };
  }
  return result;
};

export const averageCharactersPerLineMetric = ({ byExtension }) => {
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[ext] = { averageCharactersPerLine: +(stats.chars / stats.lines).toFixed(2) };
  }
  return result;
};

export const averageCharactersPerFileMetric = ({ byExtension }) => {
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[ext] = { averageCharactersPerFile: +(stats.chars / stats.files).toFixed(2) };
  }
  return result;
};