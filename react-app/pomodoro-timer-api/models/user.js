const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const db = require("../db");

// In order to hash passwords
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
    
  static makePublicUser(user) {
    //formats user information into an object
    return {
      id: user.id,
      username: user.username,
      createdAt: user.created_at,
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
      `
        INSERT INTO users (
            username,
            password
        )
        VALUES ($1, $2)
        RETURNING id, created_at ;
    `,
      [credentials.username, hashedPassword]
    );

    const user = result.rows[0];

    return User.makePublicUser(user);
  }

  static async fetchUserByUsername(username) {
    if (!username) {
      throw new BadRequestError("No username provided");
    }
    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await db.query(query, [username.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }

  static async testForErrors(credentials) {
    /* user should submit a password and username
    and if any of these fields are missing, throw an error */
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
}

module.exports = User;
