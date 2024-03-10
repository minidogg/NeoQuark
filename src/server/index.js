module.exports.server = async(wsPort)=>{
    const { WebSocketServer } = require("ws")
    const auth = require("./auth.js")
    const wss = new WebSocketServer({ port: wsPort });
    console.log("WebSocket listening on port "+wsPort)
    var sessions = {}
    wss.on('connection', function connection(ws) {
        ws.on('error', console.error);

        ws.on('message', async function message(dataa) {        
            try{
                console.log(dataa.toString())
                try{
                    var data = JSON.parse(dataa.toString())
                }catch(err){
                    ws.send(JSON.stringify({error:true,status:400,message:"Invalid JSON"+(err.name=="SyntaxError"?": "+err.message:"")}))
                    console.warn(err)
                    return;
                }
                // if(typeof(data.trackerId)=="object"){
                //     ws.send(JSON.stringify({error:true,status:415,message:"Invalid trackerId type: '"+typeof(data.trackerId)+"'"}))
                //     console.log(data.trackerId)
                //     return;
                // }
                switch(data.type){
                    case("uptime"):
                    ws.send(JSON.stringify({data:process.uptime(),status:200,trackerId:data.trackerId}))
                    break
                    case("signup"):
                    ws.send(JSON.stringify(await auth.createAcc(data)))
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