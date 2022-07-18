const { json } = require("express");
const express = require("express")
const router = express.Router()

router.post("/login", async (req, res, next) => {
    try {
        const user = await User.login(req.body);
        const token = createUserJwt(user);
    } catch (err) {
        next(err);
    }
})


router.post("/register", async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        return res.status(201).json({ user})
    } catch (err) {
        next(err);
    }
})

module.exports = router