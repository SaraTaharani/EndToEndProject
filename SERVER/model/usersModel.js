// const pool = require('../DB.js');
// const nodemailer = require('nodemailer');
// require('dotenv').config();
// //בנפרד ללקוח ועובד
// async function createUser(userId, name, email, phone1, phone2,hashedPassword) {
//   try {
//     const sqlUser = `INSERT INTO users (userId, name, email, phone1, phone2, roleId) VALUES ( ?,?,?,?,?, ?)`;
//     const [userResult] = await pool.query(sqlUser, [userId, name, email, phone1, phone2, 3]);
//     const insertId = userResult.insertId;
//     const sqlPassword = `INSERT INTO passwords (userId, password) VALUES ( ?,?)`;
//     const result = await pool.query(sqlPassword, [insertId, hashedPassword]);
//     return result[0];
//   }
//   catch (err) {
//     throw err;
//   }
// }

// async function getUsers() {
//   try {
//     console.log("model users")
//     const sql = 'SELECT u.id, userId, name, email, phone1, phone2, type role FROM users u, roles r WHERE u.roleId=r.id';
//     const result = await pool.query(sql);
//     console.log(result[0])
//     return result[0];
//   }
//   catch (err) {
//     throw err;
//   }
// }

// async function loginModel(email) {
//   try {
//     const sql = 'SELECT u.id, email, password FROM users u JOIN passwords ON u.id = passwords.userId WHERE u.email = ?';
//     const [result] = await pool.query(sql, [email]);
//     return result.length > 0 ? result[0] : null;
//   } catch (err) {
//     throw err;
//   }
// }

// async function getUserByEmail(email) {
//   try {
//     const sql = 'SELECT * FROM users where email=?';
//     const [result] = await pool.query(sql, [email]);
   
//     return result;
//   }
//   catch (err) {
//     console.log(err);
//   }
// } 



//     // יצירת אובייקט של Transporter עם פרטי ההתחברות שלך
//     let transporter = nodemailer.createTransport({
//       service: 'gmail', // אפשר להשתמש בשירותים אחרים כמו yahoo, outlook וכו'.
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
        
//       }
//     });
    

//     // פונקציה לשליחת אימייל למשתמש
//     const sendEmailToUser = async (user) => {
//       const mailOptions = {
//         to: user.email, // כתובת המייל של המשתמש
//         subject: `Hi ${user.name} 🤗`, // נושא האימייל
//         text: `Welcome to our service, ${user.name}!`, // תוכן האימייל בטקסט רגיל
//         html: `<b>Welcome to our service, ${user.name}!</b>` // תוכן האימייל ב-HTML
//       };
//       await sendMail(mailOptions); // קריאה לפונקציה sendMail עם הפרמטר mailOptions
//     };
    
//     // פונקציה לשליחת אימייל בפועל
//     const sendMail = async (mailOptions) => {
//       try {
//         let info = await transporter.sendMail(mailOptions);
//         console.log('Email sent: ' + info.response);
//       } catch (error) {
//         console.error('Error sending email:', error);
//       }
//     };
    

    
// async function getUserById(id) {
//   //לעשות גם לקוח וגם עובד
//   try {
//     console.log(id)
//     const sql = 'SELECT u.id, userId, name, email, phone1, phone2, type role FROM users u JOIN roles r ON u.roleId=r.id WHERE u.id=?';
//     const [result] = await pool.query(sql, [id]);
//     console.log(JSON.stringify(result[0])+'gggg');
//     return result.length > 0 ? JSON.stringify(result[0]) : null;
//   }
//   catch (err) {
//     throw err;
//   }
// }
// // בנפרד ללקוח ועובד
// async function updateUser(id, userId, name, email, phone1, phone2, hashedPassword) {
//   try {
//     const sqlUser = 'UPDATE users SET userId=? name=? email=? phone1=? phone2=? WHERE id=?';
//     const sqlPassword = 'UPDATE passwords SET password=? WHERE userId=?';
//     const resultUser = await pool.query(sqlUser, [userId, name, email, phone1, phone2, id]);
//     const resultPassword = await pool.query(sqlPassword, [hashedPassword, id]);
//     return resultUser[0];
//   }
//   catch (err) {
//     throw err;
//   }
// }

// async function deleteUser(id) {
//   try {
//     const sql1 = 'DELETE  FROM passwords where userId=?';
//     const result1 = await pool.query(sql1, [id]);
//     const sql = 'DELETE FROM users WHERE id=?';
//     const result = await pool.query(sql, [id]);
//     return result[0];
//   } catch (err) {
//     throw err;
//   }
// }

// module.exports = { createUser, getUsers, getUserById, getUserByEmail, updateUser, deleteUser, loginModel ,sendEmailToUser}




const pool = require('../DB.js');




const updateUserPassword = async (userId, temporaryPassword) => {
  const hashedPassword = hashPassword(temporaryPassword); 
  const sql = 'UPDATE passwords SET password=? WHERE userId=?';
  await pool.query(sql, [hashedPassword, userId]);
};
const bcrypt = require('bcrypt');
const hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};
;

async function createUser(userId, name, email, phone1, phone2, hashedPassword) {
  try {
    const sqlUser = `INSERT INTO users (userId, name, email, phone1, phone2, roleId) VALUES ( ?,?,?,?,?, ?)`;
    const [userResult] = await pool.query(sqlUser, [userId, name, email, phone1, phone2,2]);
    const insertId = userResult.insertId;
    const sqlPassword = `INSERT INTO passwords (userId, password) VALUES ( ?,?)`;
    const result = await pool.query(sqlPassword, [insertId, hashedPassword]);
    return result[0];
  }
  catch (err) {
    throw err;
  }
}

async function getUsers() {
  try {
    const sql = 'SELECT u.id, userId, name, email, phone1, phone2, type role FROM users u, roles r WHERE u.roleId=r.id';
    const result = await pool.query(sql);
    return result[0];
  }
  catch (err) {
    throw err;
  }
}

async function loginModel(email) {
  try {
    const sql = 'SELECT u.id, email, password FROM users u JOIN passwords ON u.id = passwords.userId WHERE u.email = ?';
    const [result] = await pool.query(sql, [email]);
    return result.length > 0 ? result[0] : null;
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    const sql = 'SELECT * FROM users where email=?';
    const [result] = await pool.query(sql, [email]);
    return result;
  }
  catch (err) {
    (err);
  }
} 

async function getUserById(id) {
  try {
  
    const sql = 'SELECT u.id, userId, name, email, phone1, phone2, type role FROM users u JOIN roles r ON u.roleId=r.id WHERE u.id=?';
    const [result] = await pool.query(sql, [id]);
    return result.length > 0 ? JSON.stringify(result[0]) : null;
  }
  catch (err) {
    throw err;
  }
}

async function updateUser(id, name, email, phone1, phone2, hashedPassword) {
  try {
    const sqlUser = 'UPDATE users SET name=?, email=?, phone1=?, phone2=? WHERE id=?';
    const sqlPassword = 'UPDATE passwords SET password=? WHERE userId=?';
    const resultUser = await pool.query(sqlUser, [name, email, phone1, phone2, id]);
    const resultPassword = await pool.query(sqlPassword, [hashedPassword, id]);
    return resultUser[0];
  }
  catch (err) {
    throw err;
  }
}

async function deleteUser(id) {
  try {
    const sqlPassword = 'DELETE FROM passwords where userId=?';
    const result1 = await pool.query(sqlPassword, [id]);
    const sql = 'DELETE FROM users WHERE id=?';
    const result = await pool.query(sql, [id]);
    return result[0];
  } catch (err) {
    throw err;
  }
}

module.exports = { createUser, getUsers, getUserById, getUserByEmail, updateUser, deleteUser, loginModel, updateUserPassword};
