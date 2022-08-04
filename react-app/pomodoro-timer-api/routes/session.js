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
      for(let i = Object.keys(uniqueDates).length - 1; i > 0; i--) {
          const dateSessions = sessionHistory.filter((row) => getFormattedDate(row.created_at) == Object.keys(uniqueDates)[i])
          data.push({ session: dateSessions, date: Object.keys(uniqueDates)[i]});
      }
      return res.status(201).json({ data: data });
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
