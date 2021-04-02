const express = require('express')
const config = require('config')
const auth = require('../routes/auth')
const users = require('../routes/users')
const items = require('../routes/items')
const error = require('../middlewares/error')

const version = config.get('VERSION')

module.exports = function (app) {
    app.use(express.json())
    app.use(`/api/${version}/auth`, auth)
    app.use(`/api/${version}/users`, users)
    app.use(`/api/${version}/items`, items)
    app.use(error)
}
