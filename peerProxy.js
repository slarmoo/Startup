const { WebSocketServer } = require('ws');
const uuid = require('uuid');
function peerProxy(httpServer) {
    const wss = new WebSocketServer({ port: 9900 });

    httpServer.on("upgrade", (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit("commection", ws, request);
        });
    });

    let connections = [];

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws };
        connections.push(connection);

        ws.on('message', (data) => {
            connections.forEach((c) => {
                if(c.id !== connection.id) {
                    c.ws.send(data);
                }
            });
        });


        ws.on("close", () => {
            const pos = connections.findIndex((o, i) => i.id === connection.id);

            if (pos >= 0) {
                connections.splice(pos, 1);
            }
        })
    });

}

module.exports = { peerProxy }