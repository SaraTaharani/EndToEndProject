const express = require("express");
const router = express.Router();
const controller = require('../controllers/galleryController');
const { verifyJWT, authAdmin } = require('../middleware/authorization');
const cors = require('cors'); 
const multer = require('multer'); 
const path = require('path');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

router.get("/", async (req, res) => {
    try {
        const gallery = await controller.getGallery();
        res.status(200).send(gallery); // Use 200 OK for GET requests
    } catch (err) {
        res.status(500).send(err);
    }
});
router.use(verifyJWT);

router.post('/', authAdmin, upload.single('image'), async (req, res) => {
    const image = req.file.filename;
    const response = await controller.createPhoto(image);
    res.status(200).send(await controller.getGallery());
});

router.delete("/:id", authAdmin, async (req, res) => {
    const photoId = req.params.id;
    const response = await controller.deletePhoto(photoId);
    res.status(200).send(await controller.getGallery()); // Use 200 OK for DELETE requests
});

module.exports = router;
