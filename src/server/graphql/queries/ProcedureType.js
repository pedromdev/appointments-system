import {GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql';

import DoctorType from './DoctorType';

const ProcedureType = new GraphQLObjectType({
  name: 'ProcedureType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    duration: { type: GraphQLInt },
    doctor: {
      type: DoctorType,
      resolve(model) {
        return model.getDoctor();
      }
    }
  })
});

export default ProcedureType;