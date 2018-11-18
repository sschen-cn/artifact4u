const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Card = mongoose.model('Card')

// typeList: [
//     {type_id: 1,type_en: 'Hero', type_cn: '英雄卡'},
//     {type_id: 2,type_en: 'Spell', type_cn: '法术卡'},
//     {type_id: 3,type_en: 'Ability', type_cn: '增益卡'},
//     {type_id: 4,type_en: 'Creep', type_cn: '生物卡'},
//     {type_id: 5,type_en: 'Item', type_cn: '道具卡'}
//   ]

// const url = 'https://media.st.dl.bscstorage.net/apps/583950/resource/card_set_1.0E871AFDD63D1CBD0FB52D924DF1923C4A6D443A.json'
const url = 'https://media.st.dl.bscstorage.net/apps/583950/resource/card_set_0.BB8732855C64ACE2696DCF5E25DEDD98D134DD2A.json'

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "finish")
  })
}

async function fetchCard() {
  const res = await rp(url)
  let body = JSON.parse(res)
  let cardList = body.card_set.card_list

  for (let i = 0; i < cardList.length; i++) {
    let item = cardList[i]
    console.log('item: ' + item)

    let card = await Card.findOne({
      id: item.card_id
    })

    if (!card) {
      card = new Card()
    }

    card.name_en = item.card_name.english.replace(/\s+/g,"")
    card.id = item.card_id + 10000
    // card.id = item.card_id
    card.type_en = item.card_type || ''
    card.type_id = null
    if(item.card_type === 'Hero') {
      card.type_id = 1
    }
    if(item.card_type === 'Spell') {
      card.type_id = 2
    }
    if(item.card_type === 'Ability') {
      card.type_id = 3
    }
    if(item.card_type === 'Creep') {
      card.type_id = 4
    }
    if(item.card_type === 'Item') {
      card.type_id = 5
    }
    card.desc_en = item.card_text.english || ''
    card.large_img = item.large_image.default || ''
    card.mini_img = item.mini_image.default || ''
    card.icon_img = item.ingame_image.default || ''
    card.mana_cost = item.mana_cost || ''
    card.atk = item.attack || ''
    card.hp = item.hit_points || ''

    if (card.ref > 0 ) {
      card.ref = []
    }

    if(item.references.length > 0) {
      for (let j = 0; j < item.references.length; j++) {
        if (item.references[j].ref_type === 'includes') {
          card.ref.push(item.references[j].card_id)
        }
      }
    }

    await card.save()
    console.log(`已经存入第${i+1}张卡牌`)
    await timeout(100)
  }
  console.log(`卡牌存入完毕！`)
}
fetchCard()