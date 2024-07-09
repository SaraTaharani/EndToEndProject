const model= require('../model/ContactUsModel')

async function createContactUs( name, email, phone, dressStyle, remarks){
    try {
        return model.createContactUs(name, email, phone, dressStyle, remarks);
    } catch (err) {
        throw err;
    }
}
module.exports = { createContactUs}
