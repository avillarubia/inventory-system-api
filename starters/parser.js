const bodyParser = require('body-parser')
const config = require('config')

module.exports = function (app) {
    const limit = config.get('FILE_SIZE_LIMIT')
    const option = {
        limit,
        extended: true
    }

    app.use(bodyParser.json(option))
    app.use(bodyParser.urlencoded(option))
}