const path = require("path");
const multer = require("multer");
const express = require('express');
const _ = require('lodash')
const { authorization, decodeToken } = require("../middlewares/authorization");
const { User } = require("../models/user");
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
    const decodedToken = decodeToken(req.headers['x-auth-token'])

    const update = {
        avatar: req.file.filename
    }
    const option = {
        new: true
    }
    const user = await User.findByIdAndUpdate(decodedToken._id, update, option)

    const _user = JSON.parse(JSON.stringify(user))
    const picks = _.omit(_user, ['password'])
    const token = user.generateAuthToken(picks)

    res.send(token)
})

module.exports = router
