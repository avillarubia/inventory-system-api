const helmet = require('helmet')
const compression = require('compression')

module.exports = function (app) {
    if (process.env.NODE_ENV !== 'production') return
    app.use(helmet())
    app.use(compression())
}
