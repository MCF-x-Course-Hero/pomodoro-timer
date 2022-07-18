const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const { NotFoundError } = require("./utils/errors")

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan("tiny"))

app.use((req, res, next) => {
    return next(new NotFoundError())
})
app.use((err, req, res, next) => {
    const status = err.status ||500
    const message = err.message

    return res.status(status).json({
        error: { message, status }
    })
})

app.get("/", async (req, res, next)=>{
    return res.status(200).json({ping:"pong"})
    
})


module.exports = app