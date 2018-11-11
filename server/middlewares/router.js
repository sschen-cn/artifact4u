const { Route } = require('../libs/decorator')
const { resolve } = require('path')

export const router = app => {
  const apiPath = resolve(__dirname, '../routes')
  const router = new Route(app, apiPath)

  router.init()
}