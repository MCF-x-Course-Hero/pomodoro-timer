const bcrypt = require("bcrypt");
const db = require("../db");
const tokens = require("../utils/tokens");
const { BCRYPT_WORK_FACTOR } = require("../config");

const createUsers = async () => {
    await db.query(`
    INSERT INTO users (username, password)
    VALUES (
        'tonyhawk',
        '${await bcrypt.hash("proskater2001", BCRYPT_WORK_FACTOR)}'
      ), (
        'lebronjames',
        '${await bcrypt.hash("password", BCRYPT_WORK_FACTOR)}'
      ), (
        'johncena',
        '${await bcrypt.hash("camo", BCRYPT_WORK_FACTOR)}'
      );
    `)

    const results = await db.query(`SELECT id FROM users ORDER BY id ASC`);

    const ids = results.rows.map((row) => row.id);
    return ids;
}

const thawkToken = tokens.createUserJwt({ username: "lebronjames" });
const lebronToken = tokens.createUserJwt({ username: "tonyhawk" });
const cenaToken = tokens.createUserJwt({ username: "johncena" });

module.exports = {
    createUsers,
    thawkToken,
    lebronToken,
    cenaToken,
}