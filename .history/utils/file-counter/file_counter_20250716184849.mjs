const counts = {
  folders: 0,
  maxNesting: 0,
};

const start = process.argv[2] || '.';
await walk(start);

for (const ext in counts) {
  if (ext === 'folders' || ext === 'maxNesting') continue;
  const { files, lines, chars } = counts[ext];
  counts[ext] = {
    files,
    'lines-per-file': +(lines / files).toFixed(2),
    'char-per-line': +(chars / lines).toFixed(2),
    'char-per-file': +(chars / files).toFixed(2),
  };
}

console.log(counts);
