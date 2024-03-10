const fs = require("fs")
const path = require("path")

module.exports.getAccounts = async ()=>{
    return await JSON.parse(fs.readFileSync(path.resolve("../data/accounts.json"),"utf-8"))
}