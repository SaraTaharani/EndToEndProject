const express = require("express");
const router = express.Router();
const controller = require('../controllers/mailController');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
  try {
    const response = await controller.sendEmailToMe(req.body.name, req.body.email, req.body.phone, req.body.dressStyle, req.body.remarks);
    res.status(200).json('send successful');
  }
   catch (err) {
    const error = {
      message: err.message
    };
    res.status(500).send(error);
  }
});

module.exports = router;
