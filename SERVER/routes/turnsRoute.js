const express = require("express");
const router = express.Router();
const controller = require('../controllers/turnsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

router.get("/", async (req, res) => {
    try {
        res.status(200).send(await controller.getTurns())
    }
    catch (err) {
        res.status(500).send(err);
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const Turn = await controller.getTurn(id);
    res.status(200).send(Turn)
});

router.post('/', async (req, res) => {
    const response = await controller.creatTurn(req.body.date, req.body.hour, req.body.minutes, req.body.userId, req.body.typeId)
    res.status(200).send(await controller.getTurns())
})

router.put("/:id", async (req, res) => {
    const response = await controller.updateTurn(req.params.id, req.body.date, req.body.hour, req.body.minutes, req.body.userId, req.body.typeId)
    res.status(200).send(await controller.getTurns())
})

router.delete("/:id", async (req, res) => {
    const response = await controller.deleteTurn(req.params.id)
    res.status(200).send(await controller.getTurns())
})

module.exports = router