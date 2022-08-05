const Task = require("../models/task");
const Session = require("../models/session");
const { BadRequestError, ForbiddenError } = require("../utils/errors");

/**
 * Checks to make sure that the authenticated user is the owner of the task.
 * If they aren't, throws a ForbiddenError.
 * Otherwise, attaches the listing to res.locals
 */
const authedUserIsSessionOwner = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { sessionId } = req.params;
    const session = await Session.getUserSessions(user);
    if (session.username !== user.username) {
      throw new ForbiddenError("User is not allowed to fetch other user's session.");
    }
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * Checks to make sure that the authenticated user is the owner of the task.
 * If they aren't, throws a BadRequest Error.
 * Otherwise, attaches the listing to res.locals
 */
const authedUserIsTaskOwner = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { taskId } = req.params;
    const task = await Task.listPendingTask(taskId);
    if (task.username === user.username) {
      throw new BadRequestError("User is not allowed to fetch other user's tasks.");
    }
    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  authedUserIsSessionOwner,
  authedUserIsTaskOwner
}