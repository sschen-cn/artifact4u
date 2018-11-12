import mongoose from 'mongoose'

const Card = mongoose.model('Card')

export async function getCards (type = '', limit = 20, page = 0) {
  if (type !== '') {
    const data = await getTypeCards(type, limit, page)
    return data
  } else {
    const data = await getAllCards(limit, page)
    return data
  }
}

export async function getCard (_id) {
  if (!_id) return (ctx.body = {success: false, err: '_id is required'})

  const data = await Card
    .findOne({
      _id: _id
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