const Koa = require('koa')
const mongoose = require('mongoose')
const { connect, initSchemas, initAdmin } = require('./database/init')

console.log('开始连接数据库');
(async () => {
  await connect()

  initSchemas()

  // require('./crawler/apiEN')
  // require('./crawler/qiniu')

  const app = new Koa()

  app.use(async ctx => {
    ctx.body = 'Hello World'
  })

  app.listen(3002)
  console.log('artifact4u api run on: 127.0.0.3002')
})()