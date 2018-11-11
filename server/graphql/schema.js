import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'
import CardQueries from './card/query'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Quries',
    fields: Object.assign(
      CardQueries
    )
  })
})