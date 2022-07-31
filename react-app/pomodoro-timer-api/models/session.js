const {BadRequestError, UnauthorizedError, NotFoundError} =  require("../utils/errors")
const db = require("../db");

class Session{
    static async getSessionsForUser(userInfo){
        
        // getting user id
        const user = await this.fetchUserByUsername(userInfo.username)
        // throw error if username does not exist in the database
        if (!user) throw new NotFoundError(`no user by ${userInfo.username} found`)

        // if user exists, then we can use their id to query sessions associated with them
        const query = `SELECT * FROM userSessions WHERE user_id = ${user.id}`
        const result = await db.query(query)
        
        return result.rows
    }

    static async addSession(sessionInfo, userInfo){
        
        await this.testForErrors(sessionInfo, userInfo.username)
        const user = await this.fetchUserByUsername(userInfo.username)

        const result = await db.query(
            `INSERT INTO userSessions (
                second,
                minute,
                hour,
                session_type,
                user_id
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, user_id, session_type, minute, second, hour
            `, [sessionInfo.second, sessionInfo.minute, sessionInfo.hour, 
                sessionInfo.session_type, user.id]
        )
        const session = result.rows[0]
        return session;
    }
    static async testForErrors(sessionCredentials, username) {
        /*user should submit the amount of seconds, minutes, and hours that they
         spent each session, as well as the type of session (work/shortbreak/longbreak) */
        const requiredFields = ["second", "minute", "hour", "session_type"];
        requiredFields.forEach((field) => {
          if (!sessionCredentials.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body`);
          }
        });
    
        // if the username does not exsist in the db, throw an error
        const existingUser = await this.fetchUserByUsername(username);
        if (!existingUser) {
          throw new BadRequestError(`username not found: ${username}`);
        }
      }

      static async fetchUserByUsername(username) {
        // this function fetches user information when provided with a username
        if (!username) {
          throw new BadRequestError("No username provided");
        }
        const query = `SELECT * FROM users WHERE username = $1`;
        const result = await db.query(query, [username.toLowerCase()]);
        const user = result.rows[0];
        return user;
      }

}

module.exports = Session