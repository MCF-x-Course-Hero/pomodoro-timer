require("dotenv").config()
require("colors")
const BCRYPT_WORK_FACTOR = 13

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey"

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "postgres"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "pomozone"
    
    return (process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`)
}


console.log("pomozone Hub Config:".red)
console.log("PORT".blue, getDatabaseUri())
console.log(`PORT: ${PORT}`.blue)
console.log("___")

module.exports = {
    PORT, 
    getDatabaseUri,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY
}