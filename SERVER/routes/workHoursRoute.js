const express = require("express");
const router = express.Router();
const controller = require('../controllers/workHoursController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

router.get("/", async (req, res) => {
    try {
        const workHours = await controller.getWorkHoursByCurrentMonth();
        res.status(200).send(workHours);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const employeeId = req.params.id;
        const workHour = await controller.getWorkHoursOfEmployeeByCurrentMonth(employeeId);
        res.status(200).send(workHour);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { employeeId, date, startTime, endTime, duration } = req.body;
        const response = await controller.createWorkHours(employeeId, date, startTime, endTime, duration);
        res.status(201).send(await controller.getWorkHoursOfEmployeeByCurrentMonth(employeeId));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { employeeId, date, startTime, endTime, duration } = req.body;
        const workHourId = req.params.id;
        const response = await controller.updateWorkHour(workHourId, employeeId, date, startTime, endTime, duration);
        res.status(200).send(await controller.getWorkHoursOfEmployeeByCurrentMonth(employeeId));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;