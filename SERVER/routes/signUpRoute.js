// require('dotnev').config()
const express = require("express");
const cors = require('cors');
const router = express.Router();
const controller = require('../controllers/usersController')
// const jwt = require('jsonwebtoken')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));

router.post('/', async (req, res) => {
    try {
        const user = req.body;
        const response = await controller.postClient(user.name, user.email, user.phone1, user.password, user.dressStyle, user.remarks);
        res.status(200).send(await controller.getUserById(response.insertId));
    } catch (err) {
       
        res.status(500).send(err.message);
    }
});
module.exports = router