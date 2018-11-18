const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Card = mongoose.model('Card')

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, "finish")
  })
}

async function dataDeal() {
  let cardList = await Card.find({})

  for (let i = 0; i < cardList.length; i++) {
    let id = cardList[i].id
    let card = await Card.findOne({'id': id})
    if (card.refCards.length > 0) {
      for (let j = 0; j < card.refCards.length; j++){
        if (card.refCards[j].id === '') {
          let name = cardList[i].refCards[j].name
          let cardID = await Card.findOne({
            name: { $regex: name.replace(/\s+/g,""),"$options":"i"}
          })
          card.ref.push(cardID.id)

          let obj = card.refCards[j]
          console.log(obj)
          obj.id = cardID.id
          card.refCards.splice(j,1,obj)

          await card.save()
          await timeout(200)
          console.log('deal: ' + card.name)
        }
      }
    }
  }
}
// let id
// if (card.ref.length>0) {
//   id = parseInt(card.ref[j])
// } else {
//   let ref = await Card.findOne({
//     name: { $regex: item.relatedCards[j].name.replace(/\s+/g,""),"$options":"i"}
//   })
//   id = ref.id
// }

dataDeal()
// 数据去重
// db.cards.aggregate([
//   { $group: { 
//     _id: { id: "$id"}, 
//     dups: { "$addToSet": "$_id" }, 
//     count: { "$sum": 1 } 
//   }}, 
//   { $match: { 
//     count: { "$gt": 1 }
//   }}
// ],
// {allowDiskUse: true}
// ).forEach(function(doc) {
//     doc.dups.shift();
//     db.cards.remove({_id : {$in: doc.dups }});
// })