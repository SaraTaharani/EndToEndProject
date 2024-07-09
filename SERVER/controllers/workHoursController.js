const modelWorkHours = require('../model/WorkHoursModel')
async function createWorkHour(employeeId, date, startTime) {
    try {
        return modelWorkHours.createWorkHour(employeeId, date, startTime);
    } catch (err) {
        throw err;
    }
}



async function getWorkHoursOfEmployeeByCurrentMonth(employeeId) {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const formattedFirstDay = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-01`;
        const formattedLastDay = `${lastDayOfMonth.getFullYear()}-${(lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfMonth.getDate()}`;
        return modelWorkHours.getWorkHoursOfEmployeeByCurrentMonth(employeeId,formattedFirstDay,formattedLastDay);
    } catch (err) {
        throw err;
    }
}

async function getWorkHoursByCurrentMonth() {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const formattedFirstDay = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-01`;
        const formattedLastDay = `${lastDayOfMonth.getFullYear()}-${(lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfMonth.getDate()}`;
        return modelWorkHours.getWorkHoursByCurrentMonth(formattedFirstDay, formattedLastDay);
    } catch (err) {
        throw err;
    }
}

async function updateWorkHour(id, employeeId, date, startTime, endTime, duration) {
    try {
        return modelWorkHours.updateWorkHour(id, employeeId, date, startTime, endTime, duration);
    } catch (err) {
        throw err;
    }
}
module.exports = { getWorkHoursByCurrentMonth, createWorkHour, getWorkHoursOfEmployeeByCurrentMonth, updateWorkHour }
