import expressWs from 'express-ws';

const configureWebSocket = (app) => {
  const { getWss } = expressWs(app);

  app.ws('/ws', (ws, req) => {
    console.log('WebSocket connected');

    ws.on('message', (msg) => {
      console.log('Received message:', msg);
      ws.send(`You sent: ${msg}`);
    });

    ws.on('close', () => {
      console.log('WebSocket disconnected');
    });
  });

  return getWss();
};

export default configureWebSocket;