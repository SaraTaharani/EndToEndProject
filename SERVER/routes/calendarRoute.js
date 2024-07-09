const express = require("express");
const router = express.Router();
const controller=require('../controllers/calendarController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors'); 
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
  }));


router.get("/", async(req, res) => {
    try{
    const calendar = await controller.getCalendar();
    res.status(200).send(calendar)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
});

module.exports = router