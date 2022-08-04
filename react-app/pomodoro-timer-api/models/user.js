const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../utils/errors");
const { getFormattedDate } = require("../utils/date");

class User {

  static makePublicUser(user) {
    //formats user information into an object
    let date = getFormattedDate(user.created_at);
    return {
      id: user.id,
      username: user.username,
      createdAt: date,
    };
  }

  static async login(credentials) {
    const requiredFields = ["username", "password"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });
    const user = await User.fetchUserByUsername(credentials.username);
    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return User.makePublicUser(user);
      }
    }
    throw new UnauthorizedError("Invalid username/password combo");
  }

  static async register(credentials) {
    // checking for requried fields needed to create user
    await this.testForErrors(credentials);
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );
    const result = await db.query(
      `INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING username, id, created_at;
      `,[credentials.username, hashedPassword]
    );
    const user = result.rows[0];
    return User.makePublicUser(user);
  }

  static async fetchUserByUsername(username) {
    if (!username) {
      throw new BadRequestError("No username provided");
    }
    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await db.query(query, [username]);
    const user = result.rows[0];

    // TODO: check in all places if the user has not been found in db except for register endpoint.
    // if (!user) throw new BadRequestError("user not found")
    return user;
  }

  static async testForErrors(credentials) {
    /* user should submit a password and username and if either field is missing, throw an error */
    const requiredFields = ["password", "username"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });

    // if username already exists in the system, throw an error
    const existingUser = await User.fetchUserByUsername(credentials.username);
    if (existingUser) {
      throw new BadRequestError(`duplicate username: ${credentials.username}`);
    }
  }

  static async remove(username) {
    /* Delete given user from database; returns undefined. */
    let parsed = username.slice(1);
    let result = await db.query(`DELETE FROM users WHERE username = $1;`, [parsed]);
    if (!username) throw new NotFoundError(`No user: ${parsed}`);
  }
}

module.exports = User;
