const mongoose = require('mongoose')
const db = 'mongodb://localhost/artifact'
const glob = require('glob')
const {
  resolve
} = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.initAdmin = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    username: 'ChipsET'
  })

  if (!user) {
    const user = new User({
      username: 'ChipsET',
      email: 'sschen_cn@163.com',
      password: '1234qwer',
      role: 50
    })
    await user.save()
  }
}

exports.connect = () => {
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }

    mongoose.connect(db, {
      useNewUrlParser: true
    })

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++
      console.log('数据库连接失败次数：' + maxConnectTimes);
      if (maxConnectTimes < 5) {
        mongoose.connect(db, {
          useNewUrlParser: true
        })
      } else {
        throw new Error('数据库异常，请重新配置')
      }
    })

    mongoose.connection.on('error', err => {
      maxConnectTimes++
      console.log('数据库连接失败次数：' + maxConnectTimes);
      if (maxConnectTimes < 5) {
        mongoose.connect(db, {
          useNewUrlParser: true
        })
      } else {
        throw new Error('数据库异常，请重新配置')
      }
    })

    mongoose.connection.on('open', () => {
      // const Dog = mongoose.model('Dog', { name: String})
      // const doga = new Dog({name: 'alpha'})

      // doga.save().then(() => {
      //   console.log('wang')
      // })

      resolve()
      console.log('数据库连接成功!')
    })
  })
}