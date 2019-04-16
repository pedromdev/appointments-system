import {GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList} from 'graphql';

import DoctorType from './DoctorType';
import Schedule from "../../models/Schedule";
import {schedule} from "./arguments";
import {parseDateQuery} from "../../helpers";

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
      args: {
        ...schedule
      },
      resolve(model, query) {
        query = parseDateQuery(query, 'datetime');
        return Schedule.find({ _procedure_id: model._id, ...query });
      }
    }
  })
});

export default ProcedureType;