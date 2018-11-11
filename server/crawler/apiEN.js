const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Card = mongoose.model('Card')

const url = 'https://media.st.dl.bscstorage.net/apps/583950/resource/card_set_1.0E871AFDD63D1CBD0FB52D924DF1923C4A6D443A.json'

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

    let name_en = item.card_name.english
    let card = await Card.findOne({
      name_en: name_en
    })

    if (!card) {
      card = new Card()
    }

    card.name_en = name_en
    card.id = item.card_id
    card.type_en = item.card_type || ''
    card.desc_en = item.card_text.english || ''
    card.large_img = item.large_image.default || ''
    card.mini_img = item.mini_image.default || ''
    card.icon_img = item.ingame_image.default || ''
    card.mana_cost = item.mana_cost || ''

    if (card.ref.length > 0) {
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