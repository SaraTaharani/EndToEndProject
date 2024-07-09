const pool = require('../DB.js');

async function getAllActivityTimes() {
    try {
        const sql = 'SELECT * FROM activityTime';
        const result = await pool.query(sql);
        return result[0];
    } catch (err) {
        throw err;
    }
}

async function getActivityTimeById(id) {
    try {
        const sql = 'SELECT * FROM activityTime WHERE id=?';
        const result = await pool.query(sql, [id]);
        return result[0];
    } catch (err) {
        throw err;
    }
}

async function updateActivityTime(id, day, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes) {
    try {
        const sql = 'UPDATE activityTime SET day=?, startTimeHour=?, startTimeMinutes=?, endTimeHour=?, endTimeMinutes=? WHERE id=?';
        const result = await pool.query(sql, [day, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes, id]);
        return result[0];
    } catch (err) {
        throw err;
    }
}




async function deleteActivityTime(id) {
    try {
        const sql = 'DELETE FROM activityTime WHERE id=?';
        const result = await pool.query(sql, [id]);
        return result[0];
    } catch (err) {
        throw err;
    }
}


module.exports = { deleteActivityTime,  getAllActivityTimes, getActivityTimeById, updateActivityTime, deleteActivityTime};