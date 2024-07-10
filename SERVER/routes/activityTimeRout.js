const express = require("express");
const router = express.Router();
const controller = require('../controllers/activityTimeController');
const cors = require('cors');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

router.get("/", async (req, res) => {
    try {
        res.status(200).send(await controller.getAllActivityTimes());
    } catch (error) {
        res.status(500).send({ message: 'Error fetching activity times', error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        res.status(200).send(await controller.getActivityTimeById(req.params.id));
    } catch (error) {
        res.status(500).send({ message: `Error fetching activity time with ID ${req.params.id}`, error });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { day, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes } = req.body;
        await controller.updateActivityTime(req.params.id, day, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes);
        res.status(200).send(await controller.getAllActivityTimes());
    } catch (error) {
        res.status(500).send({ message: `Error updating activity time with ID ${req.params.id}`, error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await controller.deleteActivityTime(req.params.id);
        res.status(200).send(await controller.getAllActivityTimes());
    } catch (error) {
        res.status(500).send({ message: `Error deleting activity time with ID ${req.params.id}`, error });
    }
});

module.exports = router;