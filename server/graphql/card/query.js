import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import {
  CardType,
  CardsType
} from './model'
import {
  getCards,
  getCard
} from '../../api/card'

const card = {
  type: CardType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    const data = await getCard(params.id)

    return data
  }
}

const cardsInfo = {
  type: CardsType,
  args: {
    limit: {
      name: 'limit',
      type: GraphQLInt
    },
    page: {
      name: 'page',
      type: GraphQLInt
    },
    type: {
      name: 'type',
      type: GraphQLString
    }
  },
  async resolve (root, params, options) {
    const data = await getCards(params.type, params.limit, params.page)
    
    return data
  }
}

export default {
  card,
  cardsInfo
}