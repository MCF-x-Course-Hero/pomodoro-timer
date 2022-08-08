const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Settings = require("../models/settings");
const security = require("../middleware/security");

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { username } = res.locals.user;
        const user = await User.fetchUserByUsername(username);
        const settings = await Settings.addSettings(user, req.body);
        return res.status(201).json({ settings });
    } catch (err) {
        next(err);
    }
})

router.post("/update", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { username } = res.locals.user;
        const user = await User.fetchUserByUsername(username);
        const settings = await Settings.updateSettings(user, req.body);
        return res.status(203).json({ settings });
    } catch (err) {
        next(err);
    }
})

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        const { username } = res.locals.user;
        const user = await User.fetchUserByUsername(username);
        const settings = await Settings.getSettings(user);
        return res.status(200).json({ settings });
    } catch (err) {
        next(err);
    }
})

module.exports = router;