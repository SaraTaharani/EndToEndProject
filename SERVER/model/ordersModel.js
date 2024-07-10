const pool = require('../DB.js');

async function getOrders() {
    try {

        const sql = `
         SELECT o.id, u.name, u.userId, d.model, c.weddingDate,  o.returnDate
            FROM orders o
            JOIN clients c ON o.clientId = c.id
            JOIN users u ON c.userId = u.id
            JOIN dresses d ON o.dressId = d.id;
    `
        const result = await pool.query(sql);
        return result[0];
    }
    catch (err) {
        throw err;
    }
}

async function getOrder(id) {
    try {
        const sql = `
            SELECT 
                o.id, u.userId, u.name, u.phone1, u.phone2, u.email, c.weddingDate, o.returnDate, d.model, o.repairs, o.paidInAdvance ,
                GROUP_CONCAT(a.type SEPARATOR ', ') AS accessories
            FROM orders o JOIN clients c ON o.clientId = c.id
            JOIN users u ON c.userId = u.id
            JOIN dresses d ON o.dressId = d.id
            LEFT JOIN accessoriesInOrder aio ON o.id = aio.orderId
            LEFT JOIN accessories a ON aio.accessoryId = a.id
            WHERE o.id = ?`;
        const result = await pool.query(sql, [id]);
        return result[0];
    } catch (err) {
        throw err;
    }
}

async function getOrdersOfClient(userId){
    try{
        const sql = `
        SELECT 
            o.id, u.userId, u.name, u.phone1, u.phone2, u.email, c.weddingDate, o.returnDate, d.model, o.repairs, 
            GROUP_CONCAT(a.type SEPARATOR ', ') AS accessories
        FROM orders o 
        JOIN clients c ON o.clientId = c.id
        JOIN users u ON c.userId = u.id
        JOIN dresses d ON o.dressId = d.id
        LEFT JOIN accessoriesInOrder aio ON o.id = aio.orderId
        LEFT JOIN accessories a ON aio.accessoryId = a.id
        WHERE u.userId = ?
        GROUP BY o.id, u.userId, u.name, u.phone1, u.phone2, u.email, c.weddingDate, o.returnDate, d.model, o.repairs`;
        const result = await pool.query(sql,[userId]);
        return result[0];
    }
    catch(err){
        throw err;
    }
 }

async function createOrder(date, returnDate, clientId, dressId, repairs, paidInAdvance, accessoriesId) {
    try {
        console.log('model order')
        const sql = 'INSERT INTO orders (date, returnDate, clientId, dressId, repairs, paidInAdvance) VALUES (?,?,?,?,?,?)';
        const resultOrder = await pool.query(sql, [date, returnDate, clientId, dressId, repairs, paidInAdvance]);
        if (accessoriesId) {
            for (let i = 0; i < accessoriesId.length; i++) {
                const sqlAccessories = 'INSERT INTO accessoriesInOrder (orderId, accessoryId) VALUES (?,?)';
                const resultAccessories = await pool.query(sqlAccessories, [resultOrder[0].insertId, accessoriesId[i]]);
            }
        }
        return resultOrder[0];
    }
    catch (err) {
        throw err;
    }
}

async function updateOrder(id, date, returnDate, clientId, dressId, repairs, paidInAdvance, accessoriesId) {
    try {
        const sqlDeleteAccessories = `DELETE FROM accessoriesInOrder WHERE orderId=?`
        const resultDeleteAccessories = await pool.query(sqlDeleteAccessories, [id]);
        if (accessoriesId) {
            for (let i = 0; i < accessoriesId.length; i++) {
                const sqlInsertAccessories = 'INSERT INTO accessoriesInOrder (orderId, accessoryId) VALUES (?,?)';
                const resultInsertAccessories = await pool.query(sqlInsertAccessories, [orderId, accessoriesId[i]]);
            }
        }
        const sql = 'UPDATE orders SET  date=? returnDate=? clientId=? dressId=? repairs=? paidInAdvance=? WHERE id=?';
        const result = await pool.query(sql, [date, returnDate, clientId, dressId, repairs, paidInAdvance, id]);
        return result[0];
    }
    catch (err) {
        throw err;
    }
}

async function deleteOrder(id) {
    try {
        const sqlDeleteOrder = `DELETE FROM accessoriesInOrder WHERE orderId=?`
        const resultDeleteOrder = await pool.query(sqlDeleteOrder, [id]);
        const sql = 'DELETE FROM orders WHERE id=?';
        const result = await pool.query(sql, [id]);
        return result[0];
    }
    catch (err) {
        throw err;
    }
}
module.exports = { createOrder, getOrders, getOrder, updateOrder, deleteOrder,getOrdersOfClient }