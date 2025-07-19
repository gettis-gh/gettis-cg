import { createElement } from "../helper/index.js";

export function buildConsole() {
  const wrapper = createElement('p', {
    className: 'csl'
  });

  const output = createElement('div', {
    className: 'csl__op',
    id: 'csl-msgbox'
  });

  const input = createElement('div', {
    className: 'csl__ip'
  });

  const commandInput = createElement('input', {
    id: 'command-input',
    placeholder: 'type whatever (command) you want 😼'
  });

  const commandSend = createElement('button', {
    id: 'command-send',
    textContent: 'Send'
  });

  wrapper.appendChild(output);
  input.appendChild(commandInput);
  input.appendChild(commandSend);
  wrapper.appendChild(input);

  return wrapper;
}