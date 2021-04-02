const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi')
const _ = require('lodash')
const mongoose = require('mongoose')
const joigoose = require('joigoose')(mongoose)

const schema = {
    first_name: Joi.string().min(1).max(50).label('first name'),
    last_name: Joi.string().min(1).max(50).label('last name'),
    email: Joi.string().min(5).max(50).email().required(),
    password: Joi.string().min(5).max(1024).required()
}

const joiSchema = Joi.object(schema)

const userSchema = new mongoose.Schema(joigoose.convert(joiSchema), { timestamps: true })

userSchema.methods.generateAuthToken = function (picks) {
    return jwt.sign(picks, config.get('JWT_SECRET'))
}

const validateAuth = (payload) => {
    const _joiSchema = Joi.object({
        email: schema.email.required(),
        password: schema.password
    })
    return _joiSchema.validate(payload)
}

const validateUser = (payload) => {
    return joiSchema.validate(payload)
}

const User = mongoose.model('User', userSchema)

module.exports = {
    validateAuth,
    validateUser,
    User
}
