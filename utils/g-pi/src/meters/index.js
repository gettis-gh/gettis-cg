export const avgCharPerLine = ({ content }) => {
  const lines = content.split('\n');
  const avg = lines.reduce((acc, line) => acc + line.length, 0) / lines.length;
  return { "Average Char Per Line": avg };
};

export const maxCharPerLine = ({ content }) => {
  const lines = content.split('\n');
  const max = lines.reduce((maxLen, line) => Math.max(maxLen, line.length), 0);
  return { "Max Char Per Line": max };
};

export const meters = [
  avgCharPerLine,
  maxCharPerLine
];