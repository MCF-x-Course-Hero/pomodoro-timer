const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user")
const security = require("../middleware/security")
const { getFormattedDate } = require("../utils/date");



router.get("/", async (req, res, next) => {
  return res.status(200).json({ task: "working" });
});

// creating task
router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {username} = res.locals.user
    const user = await User.fetchUserByUsername(username);
    const task = await Task.createTask(req.body, user);
    return res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
});

// get completed tasks
router.get("/complete", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {username} = res.locals.user
    const user = await User.fetchUserByUsername(username);
    const taskList = await Task.getCompletedTask(user);

    const uniqueDates = {};
      taskList.forEach((task) => {
        const date = getFormattedDate(task.created_at);
        if(!uniqueDates[date]) {
          uniqueDates[date] = date;
        }
      })
      const data = [];
      Object.keys(uniqueDates).forEach((date) => {
        const dateTasks = taskList.filter((row) => getFormattedDate(row.created_at) === date);
        data.push({ tasks: dateTasks, date: date });
      })
      return res.status(201).json({ data });

} catch (error) {
  next(error);
}
});

// get pending task
router.get("/pending", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const {username} = res.locals.user
    const user = await User.fetchUserByUsername(username);
    const taskList = await Task.listPendingTask(user);
    return res.status(200).json(taskList);
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
router.delete("/:taskId", security.requireAuthenticatedUser, async function (req, res, next) {
  console.log("deleting",req.params.taskId);
  const taskId = req.params.taskId
  try {
    await Task.removeTask(taskId);
    return res.json({ Deleted: task });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
