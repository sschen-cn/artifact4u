import Koa from 'koa'
import mongoose from 'mongoose'
const { connect, initSchemas, initAdmin } = require('./database/init')
const { resolve } = require('path')
const R = require('ramda')
const MIDDLEWARES = ['common', 'parcel', 'router']
// const MIDDLEWARES = ['common', 'router']

const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}


console.log('开始连接数据库');
(async () => {
  await connect()

  initSchemas()

  // require('./crawler/apiEN')
  // require('./crawler/apiCN')
  // require('./crawler/qiniu')
  // require('./crawler/dataDeal')

  const app = new Koa()
  await useMiddlewares(app)
  app.listen(3002)
  console.log('artifact4u api run on: 127.0.0.3002')
})()