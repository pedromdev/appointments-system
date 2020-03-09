import { ApolloServer } from 'apollo-server-express'
import Schema from './graphql/Schema'

const apollo = new ApolloServer({
  schema: Schema,
  playground: process.env.NODE_ENV === 'development',
  context({ req }) {
    return {
      user: req.user
    }
  }
})

export default apollo
