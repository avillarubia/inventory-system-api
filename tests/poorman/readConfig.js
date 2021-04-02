const env = process.env.NODE_ENV
const config = require(`../../config/${env}.json`)
const keys = Object.keys(config)

if (!config[keys[0]])
    console.log(config[keys[0]])