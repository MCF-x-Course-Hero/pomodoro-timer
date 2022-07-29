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

// get completed tasks
router.get("/complete", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {username} = res.locals.user
    const user = await User.fetchUserByUsername(username);
    const taskList = await Task.getCompletedTask(req.body, user);
    return res.status(200).json(taskList);
} catch (error) {
  next(error);
}
});

// get pending task
router.get("/pending", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {username} = res.locals.user
    const user = await User.fetchUserByUsername(username);
    const taskList = await Task.listPendingTask(req.body, user);
    return res.status(200).json(user);
} catch (error) {
  next(error);
}
});

//  (post with name or put with no name) for updating task
router.post("/update", async (req, res, next) => {
  try {
    return res.status(200).json({hello:123});
  } catch (error) {
    next(error);
  }
});


// delete task
router.delete("/::task", async function (req, res, next) {
  console.log(req.params.task);
  try {
    await Task.removeTask(req.params.task);
    return res.json({ Deleted: req.params.task });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
