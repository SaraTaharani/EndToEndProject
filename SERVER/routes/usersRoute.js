const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

router.get("/", async(req, res) => {
    res.status(200).send(await controller.getUsers())
});


router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await controller.getUserById(id);
    res.status(200).send(user)
});

router.post('/', async (req, res) => {
    try{
        const response = await controller.createUser(req.body.userId,req.body.name, req.body.email,req.body.phone1,req.body.phone2,req.body.password)
        const user = await controller.getUserById(response.userId);
        res.status(200).send(await controller.getUsers());
    }
    catch(err)
    {
        res.status(500).send(err)
    }
   
})

router.delete("/:id", async (req, res) => {
    console.log("deleteUserRout")
    const response = await controller.deleteUser(req.params.id)
    res.status(200).send(await controller.getUsers())
})
router.put("/:id", async (req, res) => {
    const idUser = req.params.id;
    console.log(idUser)
    const response = await controller.updateUser(idUser,req.body.name, req.body.email,req.body.phone1,req.body.phone2,req.body.password)
    res.status(200).send(await controller.getUserById(idUser))
})


module.exports = router