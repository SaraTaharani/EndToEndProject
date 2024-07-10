const model= require('../model/disabledTurnsModel')

async function getDisabledTurns() {
    try {
        return model.getDisabledTurns();
    } catch (err) {
        throw err;
    }
}
async function deleteDisabledTurns(id) {
    try {
        console.log(id)
        return model.deleteDisabledTurns(id);
    } catch (err) {
        throw err;
    }
}
async function createDisabledTurns(date,startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes){
    try {
        return model.createDisabledTurns(date,startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes);
    } catch (err) {
        throw err;
    }
}
module.exports ={ createDisabledTurns, getDisabledTurns, deleteDisabledTurns}