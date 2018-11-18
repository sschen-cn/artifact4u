const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')
const mongoose = require('mongoose')
const Card = mongoose.model('Card')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "finish")
  })
}

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  let cards = await Card.find({})
  await timeout(1000)
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i]
    if (card.large_img && !card.large_img_key) {
      try {
        console.log('开始传large_img')
        let large_img_data = await uploadToQiniu(card.large_img, nanoid() + '.jpg')
        await timeout(1000)
        if(large_img_data.key) {
          card.large_img_key = large_img_data.key
        }
      } catch (err) {
        console.log(err)
      }
      card.save()
    }

    if (card.mini_img && !card.mini_img_key) {
      try {
        console.log('开始传mini_img')
        let mini_img_data = await uploadToQiniu(card.mini_img, nanoid() + '.jpg')
        await timeout(1000)
        if(mini_img_data.key) {
          card.mini_img_key = mini_img_data.key
        }
      } catch (err) {
        console.log(err)
      }
      card.save()
    }

    if (card.icon_img && !card.icon_img_key) {
      try {
        console.log('开始传icon_img')
        let icon_img_data = await uploadToQiniu(card.icon_img, nanoid() + '.jpg')
        await timeout(1000)
        if(icon_img_data.key) {
          card.icon_img_key = icon_img_data.key
        }
      } catch (err) {
        console.log(err)
      }
      card.save()
    }

    if (card.img && !card.img_key) {
      try {
        console.log('开始传img')
        let icon_img_data = await uploadToQiniu(card.img, nanoid() + '.jpg')
        await timeout(1000)
        if(icon_img_data.key) {
          card.img_key = icon_img_data.key
        }
      } catch (err) {
        console.log(err)
      }
      card.save()
    }

    for (let i = 0; i < card.skills.length; i++) {
      if (card.skills[i].img && !card.skills[i].img_key) {
        try {
          console.log('开始传skills[i].img')
          let icon_img_data = await uploadToQiniu(card.skills[i].img, nanoid() + '.jpg')
          await timeout(1000)
          if(icon_img_data.key) {
            let obj = card.skills[i]
            obj.img_key = icon_img_data.key
            card.skills.splice(i, 1, obj)
          }
        } catch (err) {
          console.log(err)
        }
        card.save()
      }
    }

    for (let i = 0; i < card.refCards.length; i++) {
      if (card.refCards[i].img && !card.refCards[i].img_key) {
        try {
          console.log('开始传refCards[i].img')
          let icon_img_data = await uploadToQiniu(card.refCards[i].img, nanoid() + '.jpg')
          await timeout(1000)
          if(icon_img_data.key) {
            let obj = card.refCards[i]
            obj.img_key = icon_img_data.key
            card.refCards.splice(i, 1, obj)
          }
        } catch (err) {
          console.log(err)
        }
        card.save()
      }
    }
    console.log(`卡牌${card.name}更新完毕`);
  }
  // cards.map(async card => {
    
  // })

  console.log('所有卡牌图片更新完毕')
})()