import { initSocket } from "../public/helper/index.js";
import { eventHandlerTable } from "./handler/index.js";
import { broadcastChanges, getWorldChanges, mergeObjects, startLoop } from "./helper/index.js";

let id = 0;

export function handleConnection(ws, clientSet) {
  clientSet.add({ id, socket: ws, muted: false, counter: 0 });
  world.push({id:world.length});

  ws.send(JSON.stringify({
    type: 'text',
    content: 'welcomee'
  }));

  ws.send(JSON.stringify({
    type: 'world_entire',
    content: world
  }));

  ws.send(JSON.stringify({
    type: 'user_data',
    content: {
      id
    }
  }));

  ws.send(JSON.stringify({
    type: 'car_data',
    content: {
      id: world.length-1
    }
  }))

  initSocket(ws, eventHandlerTable, {
    queue: commandQueue, 
    world, 
    clients: clientSet, 
    clientId: id,
    toMerge 
  }, (err) => {
    if (err) return console.log(err);
    console.log("Socket initialized completely")
  });
    
  id+=1;
}

const commandQueue = [];
let loop = undefined;
let world = [];
let toMerge = [];

export function startServer(config = {}, clientSet, callback) {
  console.log("starting server");
  if (loop) return;

  const actPerTick = config.actPerTick?? 2;
    
  loop = startLoop(config, () => {
    clientSet.forEach(client => {client.counter = 0});
    const cmdPerTick = clientSet.size * actPerTick;
    const commands = commandQueue.splice(0, cmdPerTick);
    commands.forEach((command) => command.handler());

    toMerge.forEach(groupById => {
      const id = groupById[0].id;
      const avg = mergeObjects(groupById);
      world[id] = {id, ...avg};
    });

    toMerge.length = 0;

    const worldChanges = getWorldChanges(world);
    if (worldChanges.length > 0) {
      broadcastChanges(
        worldChanges, 
        clientSet
      );
    };
  });

  if (typeof callback === 'function') callback();
}

export function stopServer() {
  if (!loop) return;
  clearInterval(loop);
  loop = undefined;
}