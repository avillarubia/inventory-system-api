const winston = require('winston')
const mongoose = require('mongoose')
const config = require('config')

module.exports = function () {
    const db = config.get('MONGO_URI')
    mongoose
        .set('useNewUrlParser', true)
        .set('useUnifiedTopology', true)
        .set('useCreateIndex', true)
        .connect(db)
        .then(() => winston.info('Connected to MongoDB...'))
        .catch(err => winston.error(`Could not connect to ${db}\n${err}`))
}
