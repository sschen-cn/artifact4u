import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} from 'graphql'

export let CardType = new GraphQLObjectType({
  name: 'Card',
  fields: {
    _id: {
      type: GraphQLID
    },
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    name_en: {
      type: GraphQLString
    },
    desc: {
      type: GraphQLString
    },
    desc_en: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    type_en: {
      type: GraphQLString
    },
    large_img_key: {
      type: GraphQLString
    },
    mini_img_key: {
      type: GraphQLString
    },
    icon_img_key: {
      type: GraphQLString
    },
    atk: {
      type: GraphQLInt
    },
    hp: {
      type: GraphQLInt
    },
    mana_cost: {
      type: GraphQLInt
    },
    ref: {
      type: new GraphQLList(GraphQLString)
    }
  }
})

export let CardsType = new GraphQLObjectType({
  name: 'cardsInfo',
  fields: {
    cards: {
      type: new GraphQLList(CardType)
    },
    pageInfo: {
      type: new GraphQLObjectType({
        name: 'pageInfo',
        fields: {
          totalCount: {
            type: GraphQLInt
          },
          pageCount: {
            type: GraphQLInt
          },
          currentPage: {
            type: GraphQLInt
          }
        }
      })
    }
  }
})