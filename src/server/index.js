import bodyParser from 'body-parser';
import express from 'express';
import expressGraphQL from 'express-graphql';
import mongooseConnection from './connections/mongoose';

import schema from './graphql/Schema';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

mongooseConnection.open().then(() => {
  app.listen(port, () => {
    console.log(`Listen on port ${port}...`);
  })
});