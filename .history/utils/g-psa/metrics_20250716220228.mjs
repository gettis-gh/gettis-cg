export const foldersAndNestingMetric = ({ entries }) => {
  const result = {
    folders: {
      number: 0,
      toString: () => {
        return `${this.number} folders`;
      }
    },
    maxNesting: {
      number: 0,
      toString: () => {
        return `max nesting level: ${this.number}`;
      }
    },
  };

  for (const entry of entries) {
    if (entry.type === 'folder') {
      result.folders.number++;
      if (entry.level > result.maxNesting.number) result.maxNesting.number = entry.level;
    }
  }

  return result;
};

export const extensionFilesCountMetric = ({ byExtension }) => {
  // Solo devuelve files count para cada extensión
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[`${ext} files`] = { number: {
      number: stats.files,
      toString: () => {
        return ``;
      }
    } };
  }
  return result;
};

export const averageLinesPerFileMetric = ({ byExtension }) => {
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[`${ext} files`] = { averageLinesPerFile: +(stats.lines / stats.files).toFixed(2) };
  }
  return result;
};

export const averageCharactersPerLineMetric = ({ byExtension }) => {
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[`${ext} files`] = { averageCharactersPerLine: +(stats.chars / stats.lines).toFixed(2) };
  }
  return result;
};

export const averageCharactersPerFileMetric = ({ byExtension }) => {
  const result = {};
  for (const [ext, stats] of Object.entries(byExtension)) {
    result[`${ext} files`] = { averageCharactersPerFile: +(stats.chars / stats.files).toFixed(2) };
  }
  return result;
};