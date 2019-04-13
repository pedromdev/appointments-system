import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';

import UserType from './UserType';

const DoctorType = new GraphQLObjectType({
  name: 'DoctorType',
  fields: () => ({
    id: { type: GraphQLID },
    medical_speciality: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(model) {
        return model.getUser();
      }
    }
  })
});

export default DoctorType;