import {
  GraphQLObjectType
} from 'graphql';

const DoctorType = new GraphQLObjectType({
  name: 'DoctorType',
  fields: () => ({})
});

export default DoctorType;