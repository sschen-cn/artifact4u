const views = require('koa-views')
const serve = require('koa-static')
const { resolve } = require('path')

const r = path => resolve(__dirname, path)

export const dev = async app => {
  console.log('[production] views strat!')
  
  app.use(serve(r('../../../dist')))
  app.use(views(r('../../../dist')), {
    extension: 'html'
  })

  console.log('[production] views already loading in!')
}