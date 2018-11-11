const Bundler = require('parcel-bundler')
const views = require('koa-views')
const serve = require('koa-static')
const {resolve} = require('path')

const r = path => resolve(__dirname, path)

const bundler = new Bundler(r('../../../src/index.html'), {
  publicUrl: '/',
  watch: true,
  sourceMaps: false,
  minify: true
})

exports.dev = async app => {
  console.log('[development] views strat!')

  await bundler.bundle()

  app.use(serve(r('../../../dist')))
  app.use(views(r('../../../dist')), {
    extension: 'html'
  })

  console.log('[development] views already loading!')
}