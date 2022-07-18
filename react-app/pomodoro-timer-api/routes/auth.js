const express = require("express")
const router = express.Router()
const User = require("../models/user")


router.get("/", async (req, res, next)=>{
    return res.status(200).json({ping:"pong"})
})

router.post("/login", async (req, res, next) => {
    try {
        const user = await User.login(req.body);
        return res.status(201).json({user})
    } catch (err) {
        next(err);
    }
})


router.post("/register", async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        return res.status(201).json({user})
    } catch (err) {
        next(err);
    }
})

module.exports = router