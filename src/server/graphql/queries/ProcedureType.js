import {GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList} from 'graphql';

import DoctorType from './DoctorType';
import Schedule from "../../models/Schedule";

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
    },
    schedules: {
      type: new GraphQLList(require('./ScheduleType').default),
      resolve(model) {
        return Schedule.find({ _procedure_id: model._id });
      }
    }
  })
});

export default ProcedureType;