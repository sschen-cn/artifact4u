import mongoose from 'mongoose'

const Card = mongoose.model('Card')

// export async function getCards (type = '', limit = 20, page = 0) {
//   if (type !== '') {
//     const data = await getTypeCards(type, limit, page)
//     return data
//   } else {
//     const data = await getAllCards(limit, page)
//     return data
//   }
// }
// typeList: [
//     {type_id: 1,type_en: 'Hero', type_cn: '英雄卡'},
//     {type_id: 2,type_en: 'Spell', type_cn: '法术卡'},
//     {type_id: 3,type_en: 'Ability', type_cn: '增益卡'},
//     {type_id: 4,type_en: 'Creep', type_cn: '生物卡'},
//     {type_id: 5,type_en: 'Item', type_cn: '道具卡'}
//   ]

export async function getCards (type, limit = 20, page = 0) {

  let query = {}
  if (type) {
    query.type_id = type
  }

  const count = await Card
    .count(query)
    .exec()
  let pageCount = Math.ceil(count / limit)
  let pageInfo = {
    totalCount: count,
    pageCount: pageCount,
    currentPage: page
  }
  
  let res = await Card
    .find(query)
    .sort('id': -1)
    .skip(page * limit)
    .limit(Number(limit))

  let data = {
    cards: res,
    pageInfo: pageInfo
  }
  return data
}

export async function getCard (id) {
  if (!id) return (ctx.body = {success: false, err: 'id is required'})

  const data = await Card
    .findOne({
      'id': id
    })
    .exec()
  
  return data
}

async function getAllCards(limit, page) {
  const count = await Card
    .count()
    .exec()
  let pageCount = Math.ceil(count / limit)
  let pageInfo = {
    totalCount: count,
    pageCount: pageCount,
    currentPage: page
  }

  let res = await Card
    .find({})
    .sort('id': -1)
    .skip(page * limit)
    .limit(Number(limit))
    .exec()

  let data = {
    cards: res,
    pageInfo: pageInfo
  }
  return data
}

async function getTypeCards(type, limit, page) {
  const count = await Card
    .count({'type_en': `${type}`})
    .exec()
  let pageCount = Math.ceil(count / limit)
  let pageInfo = {
    totalCount: count,
    pageCount: pageCount,
    currentPage: page
  }

  let res = await Card
    .find({'type_en': `${type}`})
    .sort('id': -1)
    .skip(page * limit)
    .limit(Number(limit))
    .exec()

  let data = {
    cards: res,
    pageInfo: pageInfo
  }
  return data
}