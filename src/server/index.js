module.exports.server = async(wsPort)=>{
    const { WebSocketServer } = require("ws")

    const wss = new WebSocketServer({ port: wsPort });
    console.log("WebSocket listening on port "+wsPort)
    var sessions = {}
    wss.on('connection', function connection(ws) {
        ws.on('error', console.error);

        ws.on('message', function message(dataa) {        
            try{
                console.log(dataa.toString())
                try{
                    var data = JSON.parse(dataa.toString())
                }catch(err){
                    ws.send(JSON.stringify({error:true,status:422,message:"Invalid JSON"+(err.name=="SyntaxError"?": "+err.message:"")}))
                    console.warn(err)
                    return;
                }
                switch(data.type){
                    case("uptime"):
                    ws.send({})
                    break
                    default:
                        ws.send(JSON.stringify({error:true,status:501,message:"Invalid message type",trackerId:data.trackerId}))
                    break
                }
            }catch(err){
                ws.send(JSON.stringify({error:true,status:422,message:"A server error occured while trying to proccess the message."}))
                console.warn(err)
            }
        });

    });
}