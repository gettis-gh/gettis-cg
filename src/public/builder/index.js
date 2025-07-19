import { createElement } from "../helper/index.js";

export function buildMessage(text) {
  const wrapper = createElement('p', {
    textContent: text
  });

  return wrapper;
}

export function buildWindow(t = "New window") {
  const wrapper = createElement('div', {
    className: 'window'
  });
  const header = createElement('div', {
    className: 'header'
  });
  const title = createElement('p', {
    className: 'title',
    textContent: t
  })
  const tools = createElement('div', {
    className: 'tools'
  });
  const minBtn = createElement('button', {
    textContent: '—'
  });
  const fulBtn = createElement('button', {
    textContent: '⛶'
  });
  const content = createElement('div', {
    className: 'content'
  });

  wrapper.appendChild(header);
  header.appendChild(title);
  header.appendChild(tools);
  tools.appendChild(minBtn);
  tools.appendChild(fulBtn);
  wrapper.appendChild(content);

  return wrapper;
}