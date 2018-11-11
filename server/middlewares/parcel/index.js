const env = process.env.NODE_ENV.toString() === 'development' ? 'dev' : 'dev'

module.exports = require(`./${env}.js`)