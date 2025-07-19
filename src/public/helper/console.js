import { sendMessage } from "../handler/console.js";

export function renderMessages({method, messages, container}, callback) {
  const handler = methodTable[method];
  if (typeof handler !== 'function') {
    callback(new Error("Invalid method"));
    return console.log("Unknown message rendering method");
  }
  handler(messages, container);
  callback();
}

const methodTable = {
  replace(messages, container) {
    container.innerHTML = "";
    insertMessages(messages, container);
  },
  addLast(messages, container) {
    insertMessages(messages, container);
  },
  addFirst(messages, container) {
    insertMessagesBefore(messages, container)
  },
}

function insertMessages(messages, container) {
  messages.forEach((message) => {
    container.appendChild(message);
  });
}

function insertMessagesBefore(messages, container) {
  for (let i = messages.length - 1; i >= 0; i--) {
    container.insertBefore(messages[i], container.firstChild);
  }
}

export function getCommand(commandStr) {
  const parts = commandStr.trim().split(" ");
  const name = parts[0];
  const args = parts.slice(1);
  return {name, args};
}

export function startConsole() {
  const commandInput = document.getElementById("command-input");
  const commandSend = document.getElementById("command-send");
  commandSend.addEventListener('click', handleSendMessage);
  commandInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") handleSendMessage(event)
  });

  function handleSendMessage(event) {
    event.preventDefault();
    
    const commandStr = commandInput.value;
    if (!commandStr) return;
    commandInput.value = "";
    
    const command = getCommand(commandStr);
    console.log(JSON.stringify(command));
    
    sendMessage(JSON.stringify(command));
  }
}