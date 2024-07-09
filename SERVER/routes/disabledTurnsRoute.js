const express = require("express");
const router = express.Router();
const controller=require('../controllers/disabledTurnsController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors'); 
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
  }));


router.get("/", async (req, res) => {
    try {
        const disabledTurns = await controller.getDisabledTurns();
        res.status(200).send(disabledTurns);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching disabled turns', error });
    }
});

router.post("/", async (req, res) => {
    try {
        await controller.createDisabledTurns(req.body.date, req.body.startTimeHour, req.body.startTimeMinutes, req.body.endTimeHour,  req.body.endTimeMinutes);
        res.status(200).send(await controller.getDisabledTurns());
    } catch (error) {
        res.status(500).send({ message: 'Error creating disabled turn', error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await controller.deleteDisabledTurns(req.params.id);
        res.status(200).send(await controller.getDisabledTurns());
    } catch (error) {
        res.status(500).send({ message: `Error deleting disabled turn with ID ${req.params.id}`, error });
    }
});
module.exports = router