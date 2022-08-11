const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../utils/errors");
const { getFormattedDate } = require("../utils/date");

const MIN_USERNAME_LENGTH = 6
const MAX_USERNAME_LENGTH = 20
const MIN_PASSWORD_LENGTH = 8

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
    if (!user) throw new BadRequestError("user not found");
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

    // checks if credentials pass minimum/maximum character length requirements
    if (credentials.username.length < MIN_USERNAME_LENGTH){
      throw new BadRequestError("Username length is less than 6 characters");
    }
    if (credentials.username.length > MAX_USERNAME_LENGTH){
      throw new BadRequestError("Username length is more than 15 characters");
    }
    if (credentials.password.length < MIN_PASSWORD_LENGTH){
      throw new BadRequestError("password length is less than 8 characters");
    }
  }

  static async remove(username) {
    /* Delete given user from database; returns undefined. */
    let parsed = username.slice(1);
    const user = await this.fetchUserByUsername(parsed);
    if (!user) throw new BadRequestError("user not found");
    let result = await db.query(`DELETE FROM users WHERE username = $1;`, [parsed]);
  }
}

module.exports = User;
