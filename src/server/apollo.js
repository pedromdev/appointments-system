import { ApolloServer } from 'apollo-server-express'
import Schema from './graphql/Schema'
import { authenticate } from './middlewares/auth'

const apollo = new ApolloServer({
  schema: Schema,
  playground: process.env.NODE_ENV === 'development',
  async context({ req, res }) {
    return authenticate(req, res)
  }
})

export default apollo
