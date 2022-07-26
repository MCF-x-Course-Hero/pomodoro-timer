const express = require("express")
const router = express.Router()
const User = require("../models/user")
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security")

router.get("/", async (req, res, next)=>{
    return res.status(200).json({auth:"working"})
})

router.post("/login", async (req, res, next) => {
    try {
        console.log(req.body)
        const user = await User.login(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({user, token})
    } catch (err) {
        next(err);
    }
})

router.post("/register", async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({user, token})
    } catch (err) {
        next(err);
    }
})

router.delete('/::username', async function (req, res, next) {
    console.log(req.params.username)
      try {
        await User.remove(req.params.username);
        return res.json({ Deleted: req.params.username });
      } catch (err) {
        return next(err);
      }
    }
  );


module.exports = router