import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'
import {
  CardType
} from './model'
import mongoose from 'mongoose'

const Card = mongoose.model('Card')

const card = {
  type: CardType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, options) {
    return Card.findOne({
      id: params.id
    }).exec()
  }
}

const cards = {
  type: new GraphQLList(CardType),
  args: {},
  resolve (root, params, options) {
    return Card.find({}).exec()
  }
}

export default {
  card,
  cards
}