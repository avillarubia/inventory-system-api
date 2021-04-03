const bcrpyt = require('bcrypt')
const _ = require('lodash')
const express = require('express')
const router = express.Router()
const { User, validateUser } = require('../models/user')
const { validateBody } = require('../middlewares/validator')
const { authorization } = require("../middlewares/authorization");

router.post('/', validateBody(validateUser), async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered')

    user = new User(req.body)
    user.password = await hashPass(user.password)

    await user.save()

    const token = generateToken(user)

    res.send(token)
})

router.patch('/', authorization, async (req, res) => {
    delete req.body.email

    const { _id, password } = req.body
    const option = {
        new: true
    }

    if (password) {
        req.body.password = await hashPass(password)
    }

    const user = await User.findByIdAndUpdate(_id, req.body, option)

    const token = generateToken(user)

    res.send(token)
})

function generateToken(document) {
    const _doc = JSON.parse(JSON.stringify(document))
    const picks = _.omit(_doc, ['password'])
    const token = document.generateAuthToken(picks)

    return token
}

async function hashPass(plainPass) {
    const salt = await bcrpyt.genSalt(10)
    const password = await bcrpyt.hash(plainPass, salt)

    return password
}

module.exports = router
