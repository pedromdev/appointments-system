import bodyParser from 'body-parser';
import express from 'express';
import expressGraphQL from 'express-graphql';
import mongooseConnection from './connections/mongoose';

import {authenticate} from './middlewares/auth';

import api from './api';
import schema from './graphql/Schema';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/api', api);
app.use('/graphql', authenticate, expressGraphQL({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}));

mongooseConnection.open().then(() => {
  app.listen(port, () => {
    console.log(`Listen on port ${port}...`);
  })
});