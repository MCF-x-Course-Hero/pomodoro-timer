const express = require("express");
const router = express.Router();
const security = require("../middleware/security");
const { getFormattedDate } = require("../utils/date");
const Session = require("../models/session");
const User = require("../models/user");

router.get("/::username", async (req, res, next) => {
  try {
      let parsed = req.params.username.slice(1);
      const user = await User.fetchUserByUsername(parsed);
      const sessionHistory = await Session.getUserSessions(user);
      const uniqueDates = {};
      sessionHistory.forEach((session) => {
        const date = getFormattedDate(session.created_at);
        if(!uniqueDates[date]) {
          uniqueDates[date] = date;
        }
      })
      const data = [];
      Object.keys(uniqueDates).forEach((date) => {
        const dateSessions = sessionHistory.filter((row) => getFormattedDate(row.created_at) === date);
        data.push({ session: dateSessions, date: date });
      })
      return res.status(304).json({ data });
  } catch (error) {
    next(error);
  }
});

router.get("/sum", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { username } = res.locals.user;
    const user = await User.fetchUserByUsername(username);
    const total = await Session.getTotal(user);
    return res.status(200).json({ total: total.duration });
  } catch (error) {
    next(error);
  }
})

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { username } = res.locals.user;
    const user = await User.fetchUserByUsername(username);
    const session = await Session.addSession(req.body, user);
    return res.status(200).json({ session });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
