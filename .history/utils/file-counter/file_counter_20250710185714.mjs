import { readdir, stat, readFile } from 'fs/promises';
import { join, extname } from 'path';

const counts = {
  folders: 0,
  maxNesting: 0,
};

async function walk(dir, level = 0) {
  counts.folders++; // contar carpeta actual
  if (level > counts.maxNesting) counts.maxNesting = level;

  for (const f of await readdir(dir)) {
    const full = join(dir, f);
    const s = await stat(full);
    if (s.isDirectory()) {
      await walk(full, level + 1); // incrementar nesting
    } else {
      const ext = extname(f) || 'no_ext';
      const content = await readFile(full, 'utf8');
      const lines = content.split('\n');
      const charCount = content.length;
      const lineCount = lines.length;

      if (!counts[ext]) counts[ext] = { files: 0, lines: 0, chars: 0 };
      counts[ext].files++;
      counts[ext].lines += lineCount;
      counts[ext].chars += charCount;
    }
  }
}

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
