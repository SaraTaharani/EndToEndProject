const express = require("express");
const router = express.Router();
const controller=require('../controllers/queuesController')
router.use (express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.get("/", async(req, res) => {
   
    res.status(200).send(await controller.getQueues())
});

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    const Queue = await controller.getQueue(id);
     res.status(200).send(Queue)
});

router.post('/', async (req, res) => {
    
    const response = await controller.postQueueController( req.body.date,req.body.hour,req.body.minutes,req.body.userId,req.body.typeId)
    res.status(200).send("postQueueController succeed")
})

router.put("/:id",async(req,res)=>{
    const response = await controller.updateQueue(req.params.id,req.body.date,req.body.hour,req.body.minutes,req.body.userId,req.body.typeId)
    res.status(200).send("updateQueue succeed ")
})

router.delete("/:id",async(req,res)=>{
    const response = await controller.deleteQueue(req.params.id)
    res.status(200).send("deleteQueue succeed")
})

module.exports = router