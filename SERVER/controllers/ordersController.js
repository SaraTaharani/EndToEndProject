const model= require('../model/ordersModel')
const dressesModel= require('../model/dressesModel')
async function getAllOrdrers() {
    try {
        return model.getOrders();
    } catch (err) {
        throw err;
    }
}
async function getOrdrer(id) {
    try {
        return model.getOrder(id);
    } catch (err) {
        throw err;
    }
}

async function getOrdersOfClient(userId) {
    try {
        return model.getOrdersOfClient(userId);
    } catch (err) {
        throw err;
    }
}

async function updateOrder(id,date, returnDate, clientId, dressId, repairs, paidInAdvance, accessoriesId) {
    try {
        const oldOrder=await model.getOrder(id);
        if(dressId!=oldOrder.dressId)
        {
            const oldDress= await dressesModel.getDress(oldOrder.dressId);
            const updateOldDress= await dressesModel.updateDress(oldOrder.dressId, oldDress.model,oldDress.price, oldDress.uses-1,oldDress.advancePayment )
            const dress= await dressesModel.getDress(dressId);
            const updateDress= await dressesModel.updateDress(dressId, dress.model,dress.price, dress.uses+1,dress.advancePayment )
        }
        return model.updateOrder(id,date, returnDate, clientId, dressId, repairs, paidInAdvance, accessoriesId);
    } catch (err) {
        throw err;
    }
}async function deleteOrder(id) {
    try {
        return model.deleteOrder(id);
    } catch (err) {
        throw err;
    }
}
async function createOrder( date, returnDate, clientId, dressId, repairs, paidInAdvance, accessoriesId){
    try {
        const dress= await dressesModel.getDress(dressId);
        const updateDress= await dressesModel.updateDress(dressId, dress.model,dress.price, dress.uses+1,dress.advancePayment )
        return model.createOrder(date, returnDate, clientId, dressId, repairs, paidInAdvance, accessoriesId);
    } catch (err) {
        throw err;
    }
}

module.exports ={getAllOrdrers,getOrdrer,updateOrder,deleteOrder,createOrder, getOrdersOfClient}