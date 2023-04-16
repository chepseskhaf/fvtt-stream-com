import * as express from 'express';
import * as http from 'http';
import * as url from 'url';
import * as path from 'path';
import { WebSocketServer } from 'ws';
import { DateTime } from 'luxon';

const DEFAULT_PORT = 62124;
const SERVER_FILES_ROOT_PATH = path.join(__dirname, '../../client/dist/');
const TIME_FORMAT = 'hh:mm';

const app = express();

const server = http.createServer(app);

app.use(express.static(SERVER_FILES_ROOT_PATH));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(SERVER_FILES_ROOT_PATH, 'index.html'));
});

const fvttWss = new WebSocketServer({ noServer: true });
const viewerWss = new WebSocketServer({ noServer: true });

fvttWss.on('connection', ws => {
    ws.on('message', rawData => {
        viewerWss.clients.forEach(viewerWs => viewerWs.send(rawData));
    });
});

viewerWss.on('connection', ws => {
    console.log(`${DateTime.now().toFormat(TIME_FORMAT)} - New viewer connected`);

    ws.on('message', characterId => {
        const fvttWs = fvttWss.clients.values().next().value as WebSocket;
        if (fvttWs !== undefined) {
            fvttWs.send(characterId as any);
        }
    });
});

server.on('upgrade', (request, socket, head) => {
    const { pathname } = url.parse(request.url!);
  
    if (pathname === '/fvtt') {
        fvttWss.handleUpgrade(request, socket, head, ws => {
            fvttWss.emit('connection', ws, request);
        });
    } else if (pathname === '/viewer') {
        viewerWss.handleUpgrade(request, socket, head, ws => {
            viewerWss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

server.listen(DEFAULT_PORT, () => {
    console.log(`${DateTime.now().toFormat(TIME_FORMAT)} - App listening on port ${DEFAULT_PORT}`);
});
