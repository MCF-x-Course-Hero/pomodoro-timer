const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { UnauthorizedError } = require("..utils/errors")

class User {
   static async login(credentials) {
    // add code here 
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
    // add code here 
    const requiredFields = [
        "username",
        "password"
    ];

    requiredFields.forEach((field) => {
        if (!credentials.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body`);
        }
    });

    // if (credentials.email.indexOf("@") <= 0) {
    //     throw new BadRequestError("invalid email");
    // }
    const existingUsername = await User.fetchUserByUsername(
        credentials.username
    );
    if (existingUsername) {
        throw new BadRequestError(`Duplicate username: ${credentials.username}`);
    }

    // const existingEmail = await User.fetchUserByEmail(credentials.email);
    // if (existingEmail) {
    //     throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    // }

    const hashedPassword = await bcrypt.hash(
        credentials.password,
        BCRYPT_WORK_FACTOR
    );

    // const lowerCasedEmail = credentials.email.toLowerCase();

    const result = await db.query(
        `
        INSERT INTO users (
            username,
            password
        )
        VALUES ($1, $2)
        RETURNING id, created_at ;
    `, [
            credentials.username,
            hashedPassword,
            // lowerCasedEmail
        ]
    );

    const user = result.rows[0];

    return User.makePublicUser(user);
}

// static async fetchUserByEmail(email) {
//     if (!email) {
//         throw new BadRequestError("No email provided");
//     }
//     const query = `SELECT * FROM users WHERE EMAIL = $1`;
//     const result = await db.query(query, [email.toLowerCase()]);
//     const user = result.rows[0];
//     return user;
// }

static async fetchUserByUsername(username) {
    if (!username) {
        throw new BadRequestError("No username provided");
    }
    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await db.query(query, [username.toLowerCase()]);
    const user = result.rows[0];
    return user;
    }
}

module.exports = User 
