const express = require("express");
const router = express.Router();
const controller = require('../controllers/clientsController')
const usersController = require('../controllers//usersController')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
  }));

router.get("/", async(req, res) => {
    res.status(200).send(await controller.getClients())
});
router.post('/', async (req, res) => {
    try {
        const response = await controller.createClient(req.body.name, req.body.email, req.body.phone1, req.body.password);
        res.status(200).send(await controller.getUserById(response.insertId));
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const response = await controller.updateClient(id, req.body.userId, req.body.name, req.body.email, req.body.phone1, req.body.phone2, req.body.weddingDate)
    res.status(200).send(response)
});
router.delete("/:id", async (req, res) => {
    try{
        console.log("delete client route: " )
        const clientId=req.params.id;
        const response = await controller.deleteClient(clientId);
        res.status(200).send(await usersController.getUsers());

    }
    catch(err){
        console.log(err.message)
        res.status(500).send(err.message);  
    }
})
module.exports = router