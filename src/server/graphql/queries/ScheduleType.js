import {GraphQLID, GraphQLObjectType, GraphQLString} from 'graphql';

import {DateScalarType} from '../scalar-types';

import UserType from './UserType';
import DoctorType from './DoctorType';
import ProcedureType from './ProcedureType';

const ScheduleType = new GraphQLObjectType({
  name: 'ScheduleType',
  fields: () => ({
    id: { type: GraphQLID },
    status: { type: GraphQLString },
    note: { type: GraphQLString },
    datetime: { type: DateScalarType },
    user: {
      type: UserType,
      resolve(model) {
        return model.getUser();
      }
    },
    doctor: {
      type: DoctorType,
      resolve(model) {
        return model.getDoctor();
      }
    },
    procedure: {
      type: ProcedureType,
      resolve(model) {
        return model.getProcedure();
      }
    }
  })
});

export default ScheduleType;