const pool = require('../DB.js');

async function createactivityTime(startTimeHour,startTimeMinutes,endTimeHour,endTimeMinutes) {
    try {
        const sql = `INSERT INTO activityTime (startTimeHour,startTimeMinutes,endTimeHour,endTimeMinutes) VALUES (?,?)`;
        const result = await pool.query(sql, [startTimeHour,startTimeMinutes,endTimeHour,endTimeMinutes]);
        return result[0];
    }
    catch (err) {
        throw err;
    }
}

async function getactivityTime() {
    try {
        const sql = 'SELECT * FROM activityTime';
        const result = await pool.query(sql);
        return result[0];
    }
    catch (err) {
        throw err;
    }
}


async function deleteactivityTime(id) {
    try {
        const sql = 'DELETE FROM activityTime WHERE id=?';
        const result = await pool.query(sql, [id]);
        return result[0];
    }
    catch (err) {
        throw err;
    }
}

module.exports = { createactivityTime, getactivityTime, deleteactivityTime}