const db = require("../db");

const createTasks = async (userIds) => {
    const secondUserId = userIds[1];
    const thirdUserId = userIds[2];

    if(!secondUserId || !thirdUserId) {
        throw new Error(`No second or third id found in ${userIds.join(", ")}`);
    }

    await db.query(`
        INSERT INTO userTasks (user_id, task, is_completed)
        VALUES (
            ${secondUserId},
            'Playing basketball',
            'false'
        ), (
            ${secondUserId},
            'Washing Dishes',
            'true'
        ), (
            ${secondUserId},
            'Studying for the MCAT',
            'false'
        ), (
            ${thirdUserId},
            'Hiding in the bushes',
            'true'
        ), (
            ${thirdUserId},
            'Reading War and Peace',
            'true'
        ), (
            ${thirdUserId},
            'Trying out my new kia soul',
            'true'
        ), (
            ${thirdUserId},
            'Not be invisible anymore',
            'false'
        )
    `)

    const results = await db.query(`SELECT id from userTasks ORDER BY id ASC`);

    const ids = results.rows.map((row) => row.id);
    return ids;
}

module.exports = {
    createTasks
}