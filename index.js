import { WebSocketServer, Server } from 'ws';

// const wss = new WebSocketServer({ port: 8080 });
const wss = new Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});