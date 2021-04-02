module.exports = function () {
    const env = process.env.NODE_ENV
    const config = require(`../config/${env}.json`)
    const keys = Object.keys(config)

    keys.map(key => {
        if (config[key]) return

        throw new Error(`FATAL ERROR: ${key} is not set.`)
    })
}
