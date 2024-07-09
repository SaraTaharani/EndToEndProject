// require('dotnev').config()
const express = require("express");
const cors = require('cors');
const router = express.Router();
const jwt=require('jsonwebtoken')
const controller=require('../controllers/usersController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
  }));

router.post('/', async (req, res) => {
    try {
        const user = await controller.loginController(req.body.email, req.body.password);
        if (user) {
            const userData=await controller.getUserById(user.id)
            const accessToken = jwt.sign(
                { "user": userData},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, maxAge: 900 * 1000 });
            res.status(200).send({user:userData, token:accessToken});
        }
         else {
            res.status(401).send('User not found');
        }
    } 
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router