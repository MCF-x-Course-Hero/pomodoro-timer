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

router.post("/add", async (req, res, next) => {
  try {
    
    return res.status(200).json({shehab:"mohsen"});
  } catch (error) {
    next(error);
  }
});


module.exports = router;
