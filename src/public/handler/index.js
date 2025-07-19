import { buildMessage } from "../builder/index.js";
import { renderMessages } from "../helper/console.js";

export function createSocket(url) {
  return new WebSocket(url);
}

export const eventHandlerTable = {
  open() {
    console.log('Succesfully connected!');
  },
  message(event) {
    const message = JSON.parse(event.data);
    handleMessage(message);
  },
  error(error) {
    console.log(`Error trying to connect: ${error.message}`);
  },
  close() {
    console.log('Closing connection.')
  }
};

function handleMessage(message) {
  const handler = messageHandlerTable[message.type];
  if (!handler || typeof handler !== 'function') return;
  handler(message);
}

const messageHandlerTable = {
  text(message) {
    const method = 'addLast';
    const messages = [buildMessage(message.content)];
    const container = document.getElementById("csl-msgbox");
    renderMessages(
      { method, messages, container }, 
      (err) => { 
        if (err) return console.log(
          `Error during rendering messages: ${err.message}`
        )
        console.log("Messages rendered succesfully");
      }
    );
  },
  world_entire(message) {
    window.world = message.content;
    console.log('initial world set up');
  },
  world_changes(message) {
    console.log("handling world changes");
    const changes = message.content;
    changes.forEach(change => {
      world[change.id] = change;
    });
  },
  user_data(message) {
    window.user = message.content;
  },
  car_data(message) {
    window.car = message.content;
  }
};