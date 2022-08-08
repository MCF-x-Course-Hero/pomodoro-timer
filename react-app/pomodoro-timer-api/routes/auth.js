const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");

router.get("/", async (req, res, next) => {
  return res.status(204).json({ auth: "working" });
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = createUserJwt(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register(req.body);
    const token = createUserJwt(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.delete("/::username", async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.status(200).json({ Deleted: req.params.username });
  } catch (err) {
    next(err);
  }
});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
      const { username } = res.locals.user;
      const user = await User.fetchUserByUsername(username);
      const publicUser = await User.makePublicUser(user);
      return res.status(200).json({ user: publicUser });
  } catch (error) {
      next(error);
  }
});

module.exports = router;
