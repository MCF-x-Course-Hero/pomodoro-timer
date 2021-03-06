const express = require("express");
const router = express.Router();
const Session = require("../models/session");

router.get("/", async (req, res, next) => {
  return res.status(200).json({ session: "working" });
});

router.get("/history", async (req, res, next) => {
  try {
      const history = await Session.getSessionsForUser({ username: "test" });
      return res.status(200).json(history);
  } catch (error) {
    next(error);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const session = await Session.addSession(req.body, { username: "test" });
    return res.status(200).json({ session });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
