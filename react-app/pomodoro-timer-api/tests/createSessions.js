const db = require("../db");

const createSessions = async (userIds) => {
    const userId = userIds[0];

    const firstSession = {
        duration: "900",
        session_type: "Pomozone",
    }

    const secondSession = {
        duration: "1500",
        session_type: "Pomozone"
    }

    await db.query(`
        INSERT INTO userSessions (
            duration,
            session_type,
            user_id
        )
        VALUES ($1, $2, $3)`, 
        [firstSession.duration,
        firstSession.session_type,
        userId]
    );

    await db.query(`
        INSERT INTO userSessions (
            duration,
            session_type,
            user_id
        )
        VALUES ($1, $2, $3)`,
        [secondSession.duration,
        secondSession.session_type,
        userId]
    );

    const results = await db.query(`SELECT id FROM userSessions ORDER BY id ASC`);

    const ids = results.rows.map((row) => row.id);
    return ids;
}

module.exports = {
    createSessions
}