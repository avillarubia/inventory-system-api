const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
const joigoose = require('joigoose')(mongoose)

const schema = {
    name: Joi.string().min(1).max(50).label('name').required(),
    description: Joi.string().min(1).max(500).label('description'),
    price: Joi.number().max(1000000).default(0).label('price'),
    quantity: Joi.number().max(100000).default(1).label('quantity').required(),
    keeper_id: Joi.string().max(50).label('keeper').required(),
    date_stored: Joi.date().label('date stored').required(),
}

const joiSchema = Joi.object(schema)

const itemSchema = new mongoose.Schema(joigoose.convert(joiSchema), { timestamps: true })

const Item = mongoose.model('Item', itemSchema)

module.exports = {
    Item
}
