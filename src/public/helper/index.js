export function createElement(tag, options = {}) {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(options)) {
    if (key in el) el[key] = value;
    else el.setAttribute(key, value);
  }

  return el;
}

export function createElementNS(tag, options = {}) {
  const svgNS = "http://www.w3.org/2000/svg";
  const el = document.createElementNS(svgNS, tag);

  for (const [key, value] of Object.entries(options)) {
    el.setAttribute(key, value);
  }

  return el;
}

export function initSocket(socket, eventHandlerTable, utils, callback) {
  Object.keys(eventHandlerTable).forEach((type) => {
    const handler = eventHandlerTable[type];
    const isValid = `on${type}` in socket;

    const isInvalid =
      !isValid ||
      typeof handler !== 'function';

    if (isInvalid) {
      if (typeof callback === 'function') {
        callback(new Error(
          `Invalid event type or handler: ${type}`
        ));
      }
      return;
    }

    socket.addEventListener(type, (aux) => handler(aux, socket, utils));
  });

  if (typeof callback === 'function') {
    callback();
  }
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

