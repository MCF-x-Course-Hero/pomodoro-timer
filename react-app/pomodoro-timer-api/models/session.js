const {BadRequestError, UnauthorizedError, NotFoundError} =  require("../utils/errors")
const db = require("../db");

class Session {

  static async getTotal(userInfo) {
    if(!userInfo) {
      throw new UnauthorizedError("No user info was provided");
    }
    const result = await db.query(`SELECT SUM(duration) AS "duration" FROM userSessions WHERE user_id = $1;`, [userInfo.id]);
    return result.rows[0];
  }

  static async getUserSessions(userInfo){
    //if user exists, then we can use their id to query sessions associated with them
    if(!userInfo) {
      throw new NotFoundError("No user info was provided");
    }
    const result = await db.query(`SELECT * FROM userSessions WHERE user_id = $1;`, [userInfo.id]);
    return result.rows;
  }

  static async addSession(sessionInfo, userInfo){
    const requiredFields = ["duration", "session_type"];
    requiredFields.forEach((field) => {
      if (!sessionInfo.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });
    const result = await db.query(
        `INSERT INTO userSessions (duration, session_type, user_id)
         VALUES ($1, $2, $3)
         RETURNING id, user_id, duration, session_type;
        `, [sessionInfo.duration, sessionInfo.session_type, userInfo.id]
    )
    return result.rows[0]
  }
}

module.exports = Session