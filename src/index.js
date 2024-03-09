async function startServer(wsPort,expressPort,dev=true){
    console.log("Starting server parts")
    const server = require("./server/index.js")
    try{
        await server.server(wsPort)
    }catch(err){
        console.warn(err)
    }
    console.log("Finished starting server parts.")
}

module.exports.startServer = startServer