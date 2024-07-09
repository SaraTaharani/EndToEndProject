const pool = require('../DB.js');

async function getWorkHoursByCurrentMonth( FirstDay,LastDay) {
    try {
        const sql = `SELECT u.id AS employeeId, u.userId, u.name, u.phone1, SUM(w.duration) AS totalDuration
        FROM users u
        INNER JOIN workHours w ON u.id = w.employeeId
        WHERE w.date BETWEEN ? AND ?
        GROUP BY u.id`;
        const result = await pool.query(sql, [FirstDay,LastDay]);
        return result[0];
    } catch (err) {
        throw err;
    }
}

async function getWorkHoursOfEmployeeByCurrentMonth(employeeId, FirstDay,LastDay) {
    try {
        
        const sql = 'SELECT * FROM workHours WHERE employeeId=? AND date BETWEEN ? AND ?';
        const result = await pool.query(sql, [employeeId, FirstDay, LastDay]);
        return result[0];
    } catch (err) {
        throw err;
    }
}

async function createWorkHours(employeeId, date, startTime, endTime, duration) {
    try {
        const sql = 'INSERT INTO workHours (employeeId, date, startTime, endTime, duration) VALUES (?,?,?,?,?)';
        const result = await pool.query(sql, [employeeId, date, startTime, endTime, duration]);
        return result[0].insertId;
    } catch (err) {
        throw err;
    }
}

async function updateWorkHour(id, employeeId, date, startTime, endTime, duration) {
    try {
        const sql = 'UPDATE workHours SET employeeId=?, date=?, startTime=?, endTime=?, duration=? WHERE id=?';
        const result = await pool.query(sql, [employeeId, date, startTime, endTime, duration, id]);
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = { createWorkHours, getWorkHoursByCurrentMonth, getWorkHoursOfEmployeeByCurrentMonth, updateWorkHour };