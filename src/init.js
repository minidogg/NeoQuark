const path = require("path")
const fs = require("fs")

async function tryCreate(dir,data){
    if(await fs.existsSync(path.resolve(dir)))return
    console.log("Creating file: "+dir)
    await fs.writeFileSync(path.resolve(dir),data)
}
module.exports.init = async ()=>{
    tryCreate("../data/accounts.json","{}")
}