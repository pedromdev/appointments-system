import { ApolloServer } from 'apollo-server-express'
import Schema from './graphql/Schema'
import pick from 'lodash.pick'

const apollo = new ApolloServer({
  schema: Schema,
  playground: process.env.NODE_ENV === 'development',
  context({ req }) {
    return pick(req, ['user', 'token'])
  }
})

export default apollo