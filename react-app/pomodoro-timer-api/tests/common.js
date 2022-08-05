const { createUsers, thawkToken, lebronToken, cenaToken } = require("./createUsers");
const { createSessions } = require("./createSessions");
const { createTasks } = require("./createTasks");
const db = require("../db.js");

const testSessionIds = [];
const testTaskIds = [];
const testTokens = { thawkToken, lebronToken, cenaToken };

async function commonBeforeAll() {
    //delete all current test data
    await db.query(`DELETE FROM userSessions`);
    await db.query(`DELETE FROM userTasks`);
    await db.query(`DELETE FROM users`);

    //insert fresh test data
    const userIds = await createUsers();
    const taskIds = await createTasks(userIds);

    for (let i = 0; i < taskIds.length; i++) {
        testTaskIds.push(taskIds[i]);
    }

    const sessionIds = await createSessions(userIds)

    for (let i = 0; i < sessionIds.length; i++) {
        testSessionIds.push(sessionIds);
    }
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach,
    testSessionIds,
    testTaskIds,
    testTokens
}