const bcrpyt = require('bcrypt')
const _ = require('lodash')
const express = require('express')
const router = express.Router()
const { Item } = require('../models/item')
const { User } = require('../models/user')
const { authorization } = require('../middlewares/authorization')

router.get('/', authorization, async (req, res) => {
    const items = await Item.find({})

    const _items = []
    const itemsPromise = await Promise.all(items.map(async item => {
        const user = await User.findById(item.keeper_id)

        let newObj = item.toObject()
        newObj.keeper_name = user.first_name + ' ' + user.last_name

        return newObj
    }))

    res.send(itemsPromise)
})

router.post('/', authorization, async (req, res) => {
    let item = new Item(req.body)
    item = await item.save()

    res.send(item)
})

router.patch('/', authorization, async (req, res) => {
    const { body } = req
    const option = {
        new: true
    }
    const item = await Item.findByIdAndUpdate(body._id, body, option)

    res.send(item)
})

router.delete('/:_id', authorization, async (req, res) => {
    const { _id } = req.params;

    const item = await Item.findByIdAndDelete(_id)

    res.send(item)
})

module.exports = router
