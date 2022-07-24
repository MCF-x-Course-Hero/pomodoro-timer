const {Client} = require("pg")
const {getDatabaseUri} = require("./config")
require("colors")

const db = new Client({connectionString:getDatabaseUri()})

db.connect((err)=>{
    if (err){
        console.error("connection error".red, err.stack)
    }
    else{
        console.log("successfully connected to postgres db!".green)
    }
})

module.exports = db