import express from 'express'; 
import 'dotenv/config';

import { createServer } from 'http';
import { WebSocketServer } from 'ws';

import router from './src/http/index.js';
import { handleConnection, startServer } from './src/ws/index.js';

const app = express();
app.use(router);

const server = createServer(app);
const wss = new WebSocketServer({ server });

const clientSet = new Set();
startServer({}, clientSet, () => console.log("Started server succesfully"));
wss.on('connection', (ws) => handleConnection(ws, clientSet));

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
server.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}`);
});
