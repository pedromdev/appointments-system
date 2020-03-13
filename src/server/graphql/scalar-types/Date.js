import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import moment from 'moment'

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return moment(value).toDate()
  },
  serialize(value) {
    return value.toISOString() // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10)
    }
    return null
  }
})
