const express = require("express")
const router = express.Router()
const User = require("../models/user")
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security")

router.get("/", async (req, res, next)=>{
    return res.status(200).json({ping:"pong"})
})

router.post("/login", async (req, res, next) => {
    try {
        const user = await User.login(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({user})
    } catch (err) {
        next(err);
    }
})


router.post("/register", async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({user})
    } catch (err) {
        next(err);
    }
})
// TODO: finish delete user endpoint
// router.delete("/delete/:username", (req, res) => {
//     console.log(req.params.username)
//     User.findOneAndDelete({ username: req.params.username}, (err, result) => {
        
//         if(err) return res.status(500).json({ msg: err});
//         const msg = {
//             msg: "user deleted",
//             username: req.params.username,
//         };
//         return res.json(msg);
//     });
// });


module.exports = router