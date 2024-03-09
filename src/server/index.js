module.exports.server = async(wsPort)=>{
    const { WebSocketServer } = require("ws")

    const wss = new WebSocketServer({ port: wsPort });
    console.log("WebSocket listening on port "+wsPort)
    wss.on('connection', function connection(ws) {
        ws.on('error', console.error);

        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });

    });
}