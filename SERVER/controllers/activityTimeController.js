const model = require('../model/activityTimeModel');





async function getAllActivityTimes() {
    try {
        return await model.getAllActivityTimes();
    } catch (err) {
        throw err;
    }
}

async function getActivityTimeById(id) {
    try {
        return await model.getActivityTimeById(id);
    } catch (err) {
        throw err;
    }
}

async function updateActivityTime(id, day, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes) {
    try {
        return await model.updateActivityTime(id, day, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes);
    } catch (err) {
        throw err;
    }
}
async function deleteActivityTime(id) {
    try {
        return await model.deleteActivityTime(id);
    } catch (err) {
        throw err;
    }
}
module.exports = {  
    deleteActivityTime,
    getAllActivityTimes,
    getActivityTimeById,
    updateActivityTime,
    deleteActivityTime
};


