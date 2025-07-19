import { commandHandlerTable } from "../handler/index.js";

export function handleCommand(socket, commandStr, commandQueue, utils) {
  const command = JSON.parse(commandStr);
  if (!command || typeof command !== 'object') return;
  const { name, args } = command;

  const handler = commandHandlerTable[name];
  const isValid = handler || commandHandlerTable[name] == 'function';
  if (!isValid) return;
  commandQueue.push({ name, handler: () => handler(args, socket, utils) });
}

export function broadcast(data, clients) {
  clients.forEach(client => client.send(data));
}

export function broadcastChanges(changes, clients) {
  clients.forEach(client => {
    const clientChanges = changes.filter(
    change => !change.changed.authorList.includes(client.id)
    );
    client.socket.send(JSON.stringify({
      type: 'world_changes',
      content: clientChanges
    }))
  });
}

export function getWorldChanges(world) {
  return world
    .filter(item => {
      return item.changed && !item.changed.checked;
    })
    .map(item => {
      item.changed.checked = true;
      return item;
    });
}

export function startLoop(config, loopBody) {
  const tickRate = config.tickRate?? 1000/20;
  return setInterval(() => loopBody(), tickRate);
}

export function mergeObjects(objects) {
const n = objects.length;
if (n === 0) return null;

const sum = {
  position: { x: 0, y: 0, z: 0 },
  dimension: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 }
};
const authorSet = new Set();

for (const o of objects) {
  const s = o.state;

  // Sumar posiciones
  sum.position.x += s.position?.x ?? 0;
  sum.position.y += s.position?.y ?? 0;
  sum.position.z += s.position?.z ?? 0;

  // Sumar dimensiones
  sum.dimension.x += s.dimension?.x ?? 0;
  sum.dimension.y += s.dimension?.y ?? 0;
  sum.dimension.z += s.dimension?.z ?? 0;

  // Sumar rotaciones
  sum.rotation.x += s.rotation?.x ?? 0;
  sum.rotation.y += s.rotation?.y ?? 0;
  sum.rotation.z += s.rotation?.z ?? 0;

  // Agregar autores
  if (o.changed?.author !== undefined) {
  authorSet.add(o.changed.author);
  }
}

// Calcular promedios
const count = n || 1;

return {
  state: {
  position: {
    x: sum.position.x / count,
    y: sum.position.y / count,
    z: sum.position.z / count
  },
  dimension: {
    x: sum.dimension.x / count,
    y: sum.dimension.y / count,
    z: sum.dimension.z / count
  },
  rotation: {
    x: sum.rotation.x / count,
    y: sum.rotation.y / count,
    z: sum.rotation.z / count
  }
  },
  changed: {
  authorList: [...authorSet],
  checked: false
  }
};
}