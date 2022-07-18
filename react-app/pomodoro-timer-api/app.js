const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan("tiny"))



app.get("/", async (req, res, next)=>{
    return res.status(200).json({ping:"pong"})
    
})


module.exports = app