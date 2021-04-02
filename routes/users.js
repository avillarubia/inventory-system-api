const bcrpyt = require('bcrypt')
const _ = require('lodash')
const express = require('express')
const router = express.Router()
const { User, validateUser } = require('../models/user')
const { validateBody } = require('../middlewares/validator')

router.post('/', validateBody(validateUser), async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered')

    user = new User(req.body)
    const salt = await bcrpyt.genSalt(10)
    user.password = await bcrpyt.hash(user.password, salt)
    await user.save()

    const _user = JSON.parse(JSON.stringify(user))
    const picks = _.omit(_user, ['password'])
    const token = user.generateAuthToken(picks)

    res.send(token)
})

module.exports = router
