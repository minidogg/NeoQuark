const fileUtils = require("../utils/file.js")
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
module.exports.createAcc = async (data)=>{
    try{
        //check for if enough info was provided
        if(!data.username||!data.password)return {error:true,status:500,message:"Not all required information was provided to create an account.",trackerId:data.trackerId}
        //* validate input
        if(typeof(data.username)!="string"||typeof(data.password)!="string")return {error:true,status:401,message:"Password and username can only be type string.",trackerId:data.trackerId}
        //check for valid username
        if(/[^\w.]/g.test(data.username))return {error:true,status:401,message:"Invalid username format. Only alphanumeric, underscore, and period characters are allowed.",trackerId:data.trackerId}
        if(data.username.length>20||data.username.length<3)return {error:true,status:401,message:"Invalid username length. Only 3 to 20 character long usernames are allowed.",trackerId:data.trackerId}
        //check if an acc with that username already exists
        var accounts = await fileUtils.getAccounts()
        if(Object.values(accounts.data).find(e=>e.username==data.username))return {error:true,status:409,message:"Account with that username already exists.",trackerId:data.trackerId}
        //check for valid password length
        if(data.password.length<1)return {error:true,status:401,message:"Invalid password length. Password must be at least 1 character long",trackerId:data.trackerId}

        var id = genRanHex(16)
        while(accounts[id]){
            id=genRanHex(16)
        }
        return {error:false,status:200,message:"Created account succesfully, please authenticate now.",trackerId:data.trackerId,accId:id}
    }catch(err){
        console.warn(err)
        return {error:true,status:500,message:"An error occured when trying to create an account",trackerId:data.trackerId}
    }
}