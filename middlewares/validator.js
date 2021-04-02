const mongoose = require("mongoose")

const validateBody = (validator, schemaModifier = null) => {
    return (req, res, next) => {
        const { error } = validator(req.body, schemaModifier)
        if (error) return res.status(400).send(error.details[0].message)

        next()
    }
}

const validateParamObjectId = () => {
    return (req, res, next) => {
        const { _id } = req.params
        const isValid = mongoose.Types.ObjectId.isValid(_id)
        if (!isValid) return res.status(400).send(`The given object id ${_id} is invalid`)

        next()
    }
}

const validateObjectId = (_id) => {
    return mongoose.Types.ObjectId.isValid(_id)
}

module.exports = {
    validateBody,
    validateParamObjectId,
    validateObjectId
}