const model= require('../model/turnsModel')

async function getTurns() {
    try {
        return model.getTurns();
    } catch (err) {
        throw err;
    }
}
async function getTurn(id) {
    try {
        return model.getTurn(id);
    } catch (err) {
        throw err;
    }
}
async function getTurnsOfClient(userId) {
    try {
        return model.getTurnsOfClient(userId);
    } catch (err) {
        throw err;
    }
}
async function updateTurn(id, date, hour, minutes, userId, typeId) {
    try {
        return model.updateTurn(id, date, hour, minutes, userId, typeId);
    } catch (err) {
        throw err;
    }
}async function deleteTurn(id) {
    try {
        return model.deleteTurn(id);
    } catch (err) {
        throw err;
    }
}
async function creatTurn( date, hour, minutes, userId, typeId){
    try {
        return model.creatTurn(date, hour, minutes, userId, typeId);
    } catch (err) {
        throw err;
    }
}

module.exports ={getTurns,getTurn, getTurnsOfClient,updateTurn,deleteTurn,creatTurn}