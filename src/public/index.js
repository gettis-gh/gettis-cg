import { createSocket, eventHandlerTable } from './handler/index.js';
import { initSocket, sleep } from '../helper/index.js';
import { startConsole } from './helper/console.js';
import { buildWindow } from './builder/index.js';
import { buildConsole } from './builder/console.js';
import { initWindowSystem } from './helper/window.js';
import { buildScreen } from './builder/screen.js';
import { startGame } from './game/index.js';
import { createElement } from './helper/index.js';

// Socket
const url = '';
window.socket = createSocket(url);
initSocket(window.socket, eventHandlerTable, {}, () => {
  console.log('Socket succesfully initialized');
});

// App
const app = document.getElementById('app');

// Window system
initWindowSystem();

// Screen
const screen = buildScreen();

const SVG_NS = "http://www.w3.org/2000/svg";
const cameraElement = document.createElementNS(SVG_NS, 'g');
cameraElement.id = 'camera';
const cameraSpace = document.createElementNS(SVG_NS, 'g');
cameraSpace.id = 'camera-space';
cameraElement.appendChild(cameraSpace);

screen.appendChild(cameraElement);
app.appendChild(screen);
(async ()=>{
  await sleep(1000);
  startGame();
} )();

// Console
const cslWindow = buildWindow("Console");
cslWindow.id = "console-window";
app.appendChild(cslWindow);

const cslWindowContent = document.querySelector('#console-window .content');
cslWindowContent.appendChild(buildConsole());

startConsole();