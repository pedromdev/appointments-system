import {
  GraphQLObjectType
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({})
});

export default UserType;