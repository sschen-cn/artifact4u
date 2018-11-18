const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Card = mongoose.model('Card')

const url = 'http://artifact.vpgame.com/api/news/artifact/cards?limit=500'

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "finish")
  })
}

async function fetchCard() {
  const res = await rp(url)
  let body = JSON.parse(res)
  let cardList = body.data
  let card 

  for (let i = 0; i < cardList.length; i++) {
    let item = cardList[i]
    console.log(item.en_name)

    if (item.name !== '') {
        if (item.en_name !== '') {
          card = await Card.findOne({
            name_en: { $regex: item.en_name.replace(/\s+/g,""),"$options":"i"}
          })
          if (card) {
            card.name = item.name
            card.rarity = item.rarity  || ''
            card.price = item.price  || ''
            card.img = item.img  || ''
            card.color = item.color || ''
            card.desc = item.desc || ''
            card.skills = []
            card.refCards = []
            if(item.skills.length > 0) {
              for (let j = 0; j < item.skills.length; j++) {
                card.skills.push(item.skills[j])
              }
            }
            if (item.relatedCards.length > 0) {
              for (let j = 0; j < item.relatedCards.length; j++) {
                let id
                if (card.ref.length > 0) {
                  id = card.ref[j]
                }
                let obj = {
                  id: id || '',
                  name: item.relatedCards[j].name || '',
                  img: item.relatedCards[j].img || '',
                  type_id: item.relatedCards[j].type || '',
                  color: item.relatedCards[j].color || '',
                  rarity: item.relatedCards[j].rarity || '',
                  price: item.relatedCards[j].price || '',
                  atk: item.relatedCards[j].attack || '',
                  defense: item.relatedCards[j].defense || '',
                  hp: item.relatedCards[j].life || '',
                  mana_cost: item.relatedCards[j].mana || '',
                  background: item.relatedCards[j].background || '',
                  avatar: item.relatedCards[j].avatar || '',
                  defense: item.relatedCards[j].defense || '',
                  desc: item.relatedCards[j].desc || ''
                }
                card.refCards.push(obj)
              }
            }

            await card.save()
          }
      }
    }

    // if (item.en_name !== '') {
    //   card = await Card.findOne({
    //     name_en: { $regex: item.en_name,"$options":"i"}
    //   })
    // } else (item.name !== '') {
    //   card = await Card.findOne({
    //     name_en: { $regex: item.name,"$options":"i"}
    //   })
    // }
    
    // if (!card) {
    //   card = new Card()

    //   card.name_en = item.en_name || ''
    // }

    // card.Cards

    // card.name = item.name  || ''
    // card.rarity = item.rarity  || ''
    // card.price = item.price  || ''
    // card.img = item.img  || ''
    // card.color = item.color || ''
    // card.skills = []
    // card.refCards = []
    // for (let j = 0; j < item.skills.length; j++) {
    //   card.skills.push(item.skills[j])
    // }
    // for (let j = 0; j < item.relatedCards.length; j++) {
    //   let obj = {
    //     id: parseInt(card.ref[0]),
    //     name: item.relatedCards[j].name || '',
    //     img: item.relatedCards[j].img || '',
    //     type_id: item.relatedCards[j].type || '',
    //     color: item.relatedCards[j].color || '',
    //     rarity: item.relatedCards[j].rarity || '',
    //     price: item.relatedCards[j].price || '',
    //     atk: item.relatedCards[j].attack || '',
    //     defense: item.relatedCards[j].defense || '',
    //     hp: item.relatedCards[j].life || '',
    //     mana_cost: item.relatedCards[j].mana || '',
    //     background: item.relatedCards[j].background || '',
    //     avatar: item.relatedCards[j].avatar || '',
    //     defense: item.relatedCards[j].defense || '',
    //     desc: item.relatedCards[j].desc || ''
    //   }
    //   card.refCards.push(obj)
    // }
    // card.skills.img = item.skills.img || ''
    // card.skills.title = item.skills.title || ''
    // card.skills.skill = item.skills.skill || ''
    // card.skills.desc = item.skills.desc || ''

    // card.refCards.id = parseInt(card.ref[0])
    // card.refCards.name = item.relatedCards.name || ''
    // card.refCards.img = item.relatedCards.img || ''
    // card.refCards.type = item.relatedCards.type || ''
    // card.refCards.color = item.relatedCards.color || ''
    // card.refCards.rarity = item.relatedCards.rarity || ''
    // card.refCards.price = item.relatedCards.price || ''
    // card.refCards.atk = item.relatedCards.atk || ''
    // card.refCards.hp = item.relatedCards.hp || ''
    // card.refCards.mana_cost = item.relatedCards.mana_cost || ''
    // card.refCards.background = item.relatedCards.background || ''
    // card.refCards.avatar = item.relatedCards.avatar || ''
    // card.refCards.defense = item.relatedCards.defense || ''
    // card.refCards.desc = item.relatedCards.desc || ''

    console.log(`已经存入第${i+1}张卡牌`)
    await timeout(100)
  }
  console.log(`卡牌存入完毕！`)
}
fetchCard()