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
        return model.deleteDisabledTurns(id);
    } catch (err) {
        throw err;
    }
}
async function createDisabledTurns( date,hour){
    try {
        return model.createDisabledTurns(date,hour);
    } catch (err) {
        throw err;
    }
}
module.exports ={ createDisabledTurns, getDisabledTurns, deleteDisabledTurns}