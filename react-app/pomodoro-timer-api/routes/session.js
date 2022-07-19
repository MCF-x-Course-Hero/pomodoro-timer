const express = require("express")
const router = express.Router()
const Session = require("../models/session")

router.get("/", async (req, res, next)=>{
    
    return res.status(200).json({hi:"hello"})


})


router.post("/add", async (req, res, next)=>{
    const session = await Session.addSession(req.body)
    return res.status(200).json(session)
})

module.exports = router
