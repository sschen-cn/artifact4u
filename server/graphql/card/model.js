import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} from 'graphql'

export let skillsType = new GraphQLObjectType({
  name: 'skills',
  fields: {
    img: {
      type: GraphQLString
    },
    img_key: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    skill: {
      type: GraphQLString
    },
    desc: {
      type: GraphQLString
    }
  }
})

export let refCardsType = new GraphQLObjectType({
  name: 'refCards',
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    img: {
      type: GraphQLString
    },
    img_key: {
      type: GraphQLString
    },
    type: {
      type: GraphQLInt
    },
    color: {
      type: GraphQLInt
    },
    rarity: {
      type: GraphQLInt
    },
    price: {
      type: GraphQLInt
    },
    atk: {
      type: GraphQLInt
    },
    defense: {
      type: GraphQLInt
    },
    hp: {
      type: GraphQLInt
    },
    mana_cost: {
      type: GraphQLInt
    },
    background: {
      type: GraphQLString
    },
    avatar: {
      type: GraphQLString
    },
    desc: {
      type: GraphQLString
    }
  }
})

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
    type_id: {
      type: GraphQLInt
    },
    type_en: {
      type: GraphQLString
    },
    color: {
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
    img: {
      type: GraphQLString
    },
    img_key: {
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
    skills: {
      type: new GraphQLList(skillsType)
    },
    refCards: {
      type: new GraphQLList(refCardsType)
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