const path = require("path")
const fs = require("fs")

async function tryCreate(dir,data){
    if(await fs.existsSync(path.resolve(dir)))return
    console.log("Creating file: '"+dir+"' from '"+__dirname+"'")
    await fs.writeFileSync(path.resolve(dir),data)
}
async function tryCreateDir(dir){
    if(await fs.existsSync(path.resolve(dir)))return
    console.log("Creating folder: '"+dir+"' from '"+__dirname+"'")
    await fs.mkdirSync(path.resolve(dir))
}
module.exports.init = async ()=>{
    await tryCreate("../data/accounts.json",JSON.stringify({metadata:{versionCode:0},data:{}}))
    await tryCreate("../data/servers.json",JSON.stringify({metadata:{versionCode:0},data:{}}))
    await tryCreateDir("../data/servers",JSON.stringify({metadata:{versionCode:0},data:{}}))

}