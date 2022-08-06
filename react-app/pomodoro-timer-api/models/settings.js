const { BadRequestError, UnauthorizedError, NotFoundError } =  require("../utils/errors");
const db = require("../db");

class Settings {

    static async addSettings(user, settings) {
        if(!user) {
            throw new UnauthorizedError("No user info provided");
        }
        const requiredFields = ["pTime", "sbTime", "lbTime", "pColor", "sbColor", "lbColor", "dark_mode", "sound_notif"];
        requiredFields.forEach((field) => {
            if(!settings.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        });
        const query = `
            INSERT INTO userSettings (pTime, sbTime, lbTime, pColor, sbColor, lbColor, dark_mode, sound_notif, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING pTime, sbTime, lbTime, pColor, sbColor, lbColor, dark_mode, sound_notif;
        `;
        const result = await db.query(query, [settings.pTime, settings.sbTime, settings.lbTime, settings.pColor, settings.sbColor, settings.lbColor, settings.dark_mode, settings.sound_notif, user.id]);
        return result.rows[0];
    }

    static async updateSettings(user, newSettings) {
        if(!user) {
            throw new UnauthorizedError("No user info provided");
        }
        const requiredFields = ["pTime", "sbTime", "lbTime", "pColor", "sbColor", "lbColor", "dark_mode", "sound_notif"];
        requiredFields.forEach((field) => {
            if(!newSettings.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        });
        const query = `
            UPDATE userSettings
            SET pTime = $1,
            sbTime = $2,
            lbTime = $3,
            pColor = $4,
            sbColor = $5,
            lbColor = $6,
            dark_mode = $7,
            sound_notif = $8
            WHERE user_id = $9;
        `;
        const result = await db.query(query, [newSettings.pTime, newSettings.sbTime, newSettings.lbTime, newSettings.pColor, newSettings.sbColor, newSettings.lbColor, newSettings.dark_mode, newSettings.sound_notif, user.id]);
        return result.rows[0];
    }

    static async getSettings(user) {
        if(!user) {
            throw new UnauthorizedError("No user info provided");
        }
        console.log("user", user);
        const query = `SELECT * FROM userSettings WHERE user_id = $1;`
        const result = await db.query(query, [user.id]);
        console.log("result.rows", result.rows[0]);
        return result.rows[0];
    }

}

module.exports = Settings;