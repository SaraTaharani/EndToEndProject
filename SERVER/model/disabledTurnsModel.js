const pool = require('../DB.js');

async function createDisabledTurns(date,startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes) {
    try {
        const sql = `INSERT INTO disabledTurns (date,startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes) VALUES (?,?,?,?,?)`;
        const result = await pool.query(sql, [date,startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes]);
        return result[0];
    }
    catch (err) {
        throw err;
    }
}

async function getDisabledTurns() {
    try {
        const sql = 'SELECT * FROM disabledTurns';
        const result = await pool.query(sql);
        return result[0];
    }
    catch (err) {
        throw err;
    }
}


async function deleteDisabledTurns(id) {
    try {
        const sql = 'DELETE FROM disabledTurns WHERE id=?';
        const result = await pool.query(sql, [id]);
        return result[0];
    }
    catch (err) {
        throw err;
    }
}

module.exports = { createDisabledTurns, getDisabledTurns, deleteDisabledTurns}