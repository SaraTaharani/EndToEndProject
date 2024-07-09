
const nodemailer = require('nodemailer');
require('dotenv').config();

const model = require('../model/usersModel');
const crypto = require('crypto');

const generateTemporaryPassword = () => {
  return crypto.randomBytes(8).toString('hex');
};

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});



const sendMail = async (mailOptions) => {
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error to be caught in the calling function
  }
};



const sendEmailToMe = async (name, email, phone, dressStyle, remarks) => {
  
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'משהי רוצה ליצור אתכם רקשר',
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Dress Style: ${dressStyle}
      Remarks: ${remarks}
    `,
    html: `
      <b>Name:</b> ${name}<br>
      <b>Email:</b> ${email}<br>
      <b>Phone:</b> ${phone}<br>
      <b>Dress Style:</b> ${dressStyle}<br>
      <b>Remarks:</b> ${remarks}
    `
  };
  await sendMail(mailOptions);
 
};


const sendEmailToUser = async (email) => {
  try {
    const user = await model.getUserByEmail(email);
    console.log('User:', user);

    if (!user || user.length === 0) {
      throw new Error('User not found');
    }

    const temporaryPassword = generateTemporaryPassword();
    const mailOptions = {
      to: user[0].email,
      subject: `Hi ${user[0].name} 🤗`,
      text: `Welcome to our service, ${user[0].name}! Your temporary password is: ${temporaryPassword}`,
      html: `<b>Welcome to our service, ${user[0].name}!</b><br>Your temporary password is: <b>${temporaryPassword}</b>`
    };

    await sendMail(mailOptions);
    await model.updateUserPassword(user[0].id, temporaryPassword);
  } catch (error) {
    console.error('Error in sendEmailToUser:', error);
    throw error; // Re-throw the error to be caught in the calling function
  }
};

module.exports = { sendEmailToUser,sendEmailToMe };