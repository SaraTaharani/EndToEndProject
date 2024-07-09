const express = require("express");
const router = express.Router();
const controller=require('../controllers/accessoriesController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
  }));

  router.get("/", async (req, res) => {
    try {
        res.status(200).send(await controller.getAllAccessories());
    } catch (error) {
        res.status(500).send({ message: 'Error fetching accessories', error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const accessory = await controller.getAccessory(id);
        res.status(200).send(accessory);
    } catch (error) {
        res.status(500).send({ message: `Error fetching accessory with ID ${id}`, error });
    }
});

router.post("/", async (req, res) => {
    try {
        await controller.createAccessory(req.body.type);
        res.status(200).send(await controller.getAllAccessories());
    } catch (error) {
        res.status(500).send({ message: 'Error creating accessory', error });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await controller.updateAccessory(id, req.body.type);
        res.status(200).send(await controller.getAllAccessories());
    } catch (error) {
        res.status(500).send({ message: `Error updating accessory with ID ${id}`, error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await controller.deleteAccessory(req.params.id);
        res.status(200).send(await controller.getAllAccessories());
    } catch (error) {
        res.status(500).send({ message: `Error deleting accessory with ID ${req.params.id}`, error });
    }
});

module.exports = router