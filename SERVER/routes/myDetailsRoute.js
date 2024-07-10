const express = require("express");
const router = express.Router();
const ordersController=require('../controllers/ordersController')
const turnsController=require('../controllers/turnsController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());
router.use(cors({
     origin: 'http://localhost:5173', 
     credentials: true
   }));
 
router.get("/:userId/orders", async(req, res) => {
    const orders = await ordersController.getOrdersOfClient(req.params.userId);
     res.status(200).send(orders)
});

router.get("/:userId/turns", async(req, res) => {
        const turns = await turnsController.getTurnsOfClient(req.params.userId);
     res.status(200).send(turns)
});

module.exports = router