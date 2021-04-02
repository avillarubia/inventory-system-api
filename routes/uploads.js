const path = require("path");
const multer = require("multer");
const express = require('express');
const { authorization } = require("../middlewares/authorization");
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const _id = Date.now() + path.extname(file.originalname)
        cb(null, _id)
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1000000 },
}).single("myImage");

router.post('/', [authorization, upload], async (req, res) => {
    res.send('SUCCESS')
})

module.exports = router
