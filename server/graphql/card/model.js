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
      type: GraphQLString
    },
    hp: {
      type: GraphQLString
    },
    mana_cost: {
      type: GraphQLString
    },
    ref: {
      type: new GraphQLList(GraphQLString)
    }
  }
})