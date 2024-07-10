const express = require("express");
const router = express.Router();
const controller = require('../controllers/mailController');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

router.post("/", async (req, res) => {
  const email = req.body.email;
  try {
    await controller.sendEmailToUser(email);
    res.status(200).send({ message: 'Email sent successfully' });
  }
  catch (error) {
    console.error('Error in router:', error);
    if (error.message === 'User not found') {
      res.status(404).send({ error: 'המשתמש לא קיים במערכת' });
    } else {
      res.status(500).send({ error: 'Failed to send email' });
    }
  }
});

module.exports = router;

module.exports = router;
