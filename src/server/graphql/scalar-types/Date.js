import {GraphQLScalarType} from 'graphql';
import { Kind } from 'graphql/language';
import moment from 'moment';

export default new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    console.log('parseValue: ', value);
    return moment(value).toDate(); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    console.log('parseLiteral: ', ast);
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});