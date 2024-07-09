const pool = require('../DB.js');
async function creatTurn( date, hour, minutes, userId, typeId){
    try {
        const rowsTurn = `INSERT INTO turns ( date, hour, minutes, userId, typeId) VALUES ( ?,?,?,?,?)`;
        const Result = await pool.query(rowsTurn, [ date, hour, minutes, userId, typeId]);
        return Result[0]; 
       } 
      catch (err){
        throw err;
      }
 }

async function getTurns(){
    try{
        const sql=`
        SELECT t1.date, t1.hour, t1.minutes, u.name, u.userId, u.email, u.phone1, c.weddingDate, t2.type
        FROM turns t1
        JOIN users u ON u.id = t1.userId
        JOIN turnTypes t2 ON t2.id = t1.typeId
        JOIN clients c ON c.userId = u.id;
        `;
        const result = await pool.query(sql);
        return result[0];
    }
    catch(err){
        throw err;
    }
 }
 
 async function getTurnsOfClient(userId){
    try{
        const sql='SELECT date, hour, minutes, type FROM turns t, users u, turnTypes tt WHERE u.id=t.userId and tt.id=t.typeId and u.userId=?';
        const result = await pool.query(sql,[userId]);
        return result[0];
    }
    catch(err){
        throw err;
    }
 }

 async function getTurn(id){
    try{
        const sql='SELECT date, hour, minutes, u.userId, name, phone1, phone2, email, weddingDate, type FROM turns q1, users u, clients c, turnTypes q2 WHERE q1.id=? and u.id=q1.userId and q2.id=q1.typeId and c.userId=u.id';
        const result = await pool.query(sql, [id]);
        return result[0];
    }
    catch(err){
        throw err;
    }
 }
 
 async function updateTurn(id, date, hour, minutes, userId, typeId){
    try{
        const sql= 'UPDATE turns SET date=? hour=? minutes=? userId=? typeId=? WHERE id=?';
        const result = await pool.query(sql, [ date, hour, minutes, userId, typeId, id]);
        return result[0];
    }
    catch(err){
       throw err;
    }
 }

 async function deleteTurn(id){
    try{
        const sql='DELETE FROM turns WHERE id=?';
        const result = await pool.query(sql, [id]);
        return result[0];
    }
    catch(err){
        throw err;
    }
 }

 module.exports ={getTurns,getTurn, getTurnsOfClient,updateTurn,deleteTurn,creatTurn}