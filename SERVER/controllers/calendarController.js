const modelDisabledTurns= require('../model/disabledTurnsModel')
const modelTurns= require('../model/turnsModel') 
const modelactivityTime= require('../model/activityTime') 

async function getCalendar() {
    try {
        const disabledTurns= await modelDisabledTurns.getDisabledTurns();
        const turns=await modelTurns.getTurns();
        const activityTime= await modelactivityTime.getactivityTime()
        const calendar={
            disabledTurns:disabledTurns, 
            turns:turns,
            activityTime:activityTime
        }
        return calendar;
    } catch (err) {
        throw err;
    }
}

module.exports ={  getCalendar}