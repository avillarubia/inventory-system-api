const winston = require('winston')
const express = require('express')
const app = express()

require('./starters/logging')()
require('./starters/parser')(app)
require('./starters/cors')(app)
require('./starters/routes')(app)
require('./starters/db')()
require('./starters/config')()
require('./starters/dataValidator')()
require('./starters/prod')(app)

const port = process.env.PORT || 3001
const server = app.listen(port, () =>
    winston.info(`Listening on port ${port}...`)
)

module.exports = server
