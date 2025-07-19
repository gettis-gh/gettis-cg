import { broadcast, handleCommand, mergeObjects } from "../helper/index.js";

export const eventHandlerTable = {
  open() {
    console.log('Succesfully connected!');
  },
  message(event, socket, utils) {
    const client = Array.from(utils.clients).find(client => client.id == utils.clientId);
    if (!client) return;
    if (client.counter >= 2) return;
    client.counter += 1;
    handleCommand(socket, event.data, utils.queue, {...utils, client});
  },
  error(error) {
    console.log(`Error trying to connect: ${error.message}`);
  },
  close() {
    console.log('Closing connection.')
  }
};

export const commandHandlerTable = {
  echo(args, socket) {
    socket.send(JSON.stringify({
      type: 'text',
      content: args
    }));
  },
  get_world(args, socket, { world }) {
    socket.send(JSON.stringify({
      type: 'text',
      content: world
    }));
  }, 
  msg(args, socket, { clients }) {
    broadcast(JSON.stringify({
      type: 'text',
      content: args
    }), new Set([...clients].map(client => client.socket)) );
    console.log('message broadcasted')
  },
  update_world(args, socket, { client, toMerge }) {
    const changes = args[0];
    changes.forEach(change => {
      change.changed = {
        checked: false,
        author: client.id
      }

      if (!change.id) {
        return;
      }

      if (!toMerge[change.id]) {
        toMerge[change.id] = [];
      };
      toMerge[change.id].push(change);
    });
  }
};