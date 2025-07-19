import { Camera, lerp, initCamera } from "./camera/index.js";
import { actionHandler, keybinds } from "./handler.js";
import { startKeyListener } from "./helper.js";
import { buildBox } from "./objects/builder.js";
import { updateBox } from "./objects/updater.js";
import { entityBase } from "./util.js";

export function startGame() {
  // Init
  const pressedKeys = new Set();
  startKeyListener(pressedKeys); 

  window.world[window.car.id] = {
    id: window.car.id,
    ...entityBase
  };

  let visualElements = [];

  const cameraSpace = document.getElementById('camera-space');
  const cameraElement = document.getElementById('camera');
  const camera = new Camera(cameraElement, cameraSpace, visualElements);

  let cameraState = {
    x: 0,
    y: 0,
    z: 0,
    rad: 0,
    zoom: 0, 
  }

  // Set loop
  loop(
    // Cicle body
    function cycle() {
      let modified = [];
            
      pressedKeys.forEach(key => {
        const handler = keybinds[key];
        if (!handler || typeof handler !== 'function') return;
        handler(actionHandler, window.world[window.car.id].state);
        //console.log(actionHandler, window.world[window.car.id].state.position)

        modified.push(window.world[window.car.id]);
        window.car.state = window.world[window.car.id].state;
      });

      window.world.forEach(item => {
        // Update visual model
        const itemElement = visualElements[item.id];
        if (itemElement) {
          updateBox(itemElement, item.state);
          return;
        };

        // Store visual model
        visualElements[item.id] = buildBox();
        cameraSpace.appendChild(visualElements[item.id]);
      });

      cameraState = {
        x: window.car.state?.position.x || 0,
        y: window.car.state?.position.z || 0,
        z: -window.car.state?.position.y || 0,
        rad: -window.car.state?.rotation.y || 0,
        zoom: 1,
      }
      camera.update(cameraState);

      if (modified.length > 0) {
        window.socket.send(JSON.stringify({
          name: 'update_world',
          args: [modified]
        }));
      }
    }
  );
}

export function loop(callback) {
  if (callback && typeof callback == 'function') callback();
  requestAnimationFrame(() => loop(callback));
}