require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey"
const IS_TESTING = process.env.NODE_ENV === "test";

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres";
    const dbHost = process.env.DATABASE_HOST || "postgres";
    const dbPort = process.env.DATABASE_PORT || 5432;
    const dbProdName = process.env.DATABASE_NAME || "pomozone";
    const dbTestName = process.env.DATA_TEST_NAME || "pomozone_test";
    const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName;

    return (process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`)
}

const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13;

console.log("Pomozone Config:".red)
console.log("PORT".blue, PORT);
console.log("IS_TESTING:".blue, IS_TESTING);
console.log("Database:".blue, getDatabaseUri());
console.log("---")

module.exports = {
    PORT, 
    getDatabaseUri,
    IS_TESTING,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY
}