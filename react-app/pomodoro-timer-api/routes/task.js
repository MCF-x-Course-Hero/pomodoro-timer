const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user")
const security = require("../middleware/security")

router.get("/", async (req, res, next) => {
  return res.status(200).json({ task: "working" });
});

// creating task
router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    console.log(res.locals.user)
    const {username} = res.locals.user
    const task = await User.fetchUserByUsername(username);
    const user = await Task.createTask(req.body, task);
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});


// accept query parameter (completed value) list
router.get("/list", async (req, res, next) => {
  try{
    const {usermane} = res.locals.user
    const nutritions = await Task.listPendingTask(email)
    return res.status(200).json({nutritions})
}catch(err){
    next(err)
}
});


// post with name or put with no name for updating task
router.post("/update", async (req, res, next) => {
  try {
    return res.status(200).json({hello:123});
  } catch (error) {
    next(error);
  }
});


router.post("/", async (req, res, next) => {
  try {
    return res.status(200).json({hello:123});
  } catch (error) {
    next(error);
  }
});



module.exports = router;
