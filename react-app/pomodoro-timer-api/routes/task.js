const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user")
const security = require("../middleware/security")
const { getFormattedDate } = require("../utils/date");

//creating task
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

//get completed tasks
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
      for(let i = Object.keys(uniqueDates).length - 1; i >= 0; i--) {
        const dateTasks = taskList.filter((row) => getFormattedDate(row.created_at) == Object.keys(uniqueDates)[i])
        data.push({ tasks: dateTasks, date: Object.keys(uniqueDates)[i]});
    }
      return res.status(200).json({ data });

} catch (error) {
  next(error);
}
});

//get pending task
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

//post for updating task
router.post("/update", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { username } = res.locals.user
    const user = await User.fetchUserByUsername(username);
    const updatedTask = await Task.updateTask(req.body, user);
    return res.status(201).json({ updatedTask: updatedTask });
  } catch (err) {
    next(err);
  }
});

//delete task
router.delete("/:taskId", security.requireAuthenticatedUser, async function (req, res, next) {
  const taskId = req.params.taskId.slice(1);
  try {
    await Task.removeTask(taskId);
    return res.status(204).json({ deleted: taskId });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
