const express = require("express");
const router = express.Router();
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
  }));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    try {
      res.send(req.user);
    } catch (err) {
        console.log("in auth ", err);
        res.status(500).json({ error: "User creation failed" });
    }
});

module.exports = router;