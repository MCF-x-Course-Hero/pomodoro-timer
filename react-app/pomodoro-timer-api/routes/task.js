const express = require("express");
const router = express.Router();
const Session = require("../models/task");

router.get("/", async (req, res, next) => {
  return res.status(200).json({ task: "working" });
});

router.get("/completed-tasks", async (req, res, next) => {
  try {
    return res.status(200).json({hello:123});
  } catch (error) {
    next(error);
  }
});

router.post("/addtask", async (req, res, next) => {
  try {
    const user = await Task.addTask(req.body);
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});




module.exports = router;
