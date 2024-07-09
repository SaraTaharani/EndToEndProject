const express = require("express");
const router = express.Router();
const controller = require('../controllers/turnsController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
}));

router.get("/", async (req, res) => {
    try {
        res.status(201).send(await controller.getTurns())
    }
    catch (err) {
        res.status(500).send(err);
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const Turn = await controller.getTurn(id);
    // res.status(201).send(Turn)
    res.status(201).send(Turn)
});

router.post('/', async (req, res) => {

    const response = await controller.creatTurn(req.body.date, req.body.hour, req.body.minutes, req.body.userId, req.body.typeId)
    res.status(201).send(await controller.getTurns(req.body.userId))
    // res.status(201).send("postTurnController succeed")
})

router.put("/:id", async (req, res) => {
    const response = await controller.updateTurn(req.params.id, req.body.date, req.body.hour, req.body.minutes, req.body.userId, req.body.typeId)
    res.status(201).send("updateTurn succeed ")
})

router.delete("/:id", async (req, res) => {
    const response = await controller.deleteTurn(req.params.id)
    res.status(201).send("deleteTurn succeed")
})

module.exports = router