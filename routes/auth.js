const bcrpyt = require('bcrypt')
const _ = require('lodash')
const express = require('express')
const router = express.Router()
const { User, validateAuth } = require('../models/user')
const { validateBody } = require('../middlewares/validator')

router.post('/', validateBody(validateAuth), async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password.')

    const isValid = await bcrpyt.compare(req.body.password, user.password)
    if (!isValid) return res.status(400).send('Invalid email or password.')

    const _user = JSON.parse(JSON.stringify(user))
    const picks = _.omit(_user, ['password'])
    const token = user.generateAuthToken(picks)

    res.send(token)
})

module.exports = router