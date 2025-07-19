export const countLines = ({ content  }) => {
  const lines = content.split('\n');
  return { "Lines": lines.length };
};

export const countChars = ({ content }) => {
  return { "Chars": content.length };
};

export const processors = [
  countLines,
  countChars,
  ({ name }) => { return { "name": name } },
  ({ path }) => { return { "path": path }},
  //({ content }) => { return { "content": content } },
];