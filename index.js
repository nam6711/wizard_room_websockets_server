const { Server } = require('ws');
const express = require('express');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const UDP_CLIENT = {
  client: null,
  connected: false,
}

const wss = new Server({ server });

wss.on('connection', function connection(ws) {
  console.log("CONNECTED");

  ws.on('message', (data) => {
    data = data.toString();
    if (data === "UDP") {
      console.log('UDP CLIENT CONNECTED');
      UDP_CLIENT.client = ws;
      UDP_CLIENT.connected = true;
    } else if (UDP_CLIENT.connected) {
      console.log("COMMAND SENT: %s", data);
      UDP_CLIENT.client.send(data);
    }
  });

  ws.on('close', () => {
    if (ws === UDP_CLIENT.client) {
      console.log('UDP CLIENT DISCONNECTED');
      UDP_CLIENT.address = null;
      UDP_CLIENT.connected = false;
    } else {
      console.log("client closed");
    }
  });

  ws.send('welcome');
});