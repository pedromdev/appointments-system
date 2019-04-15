import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString} from 'graphql';

import UserType from './UserType';
import Procedure from "../../models/Procedure";
import Schedule from "../../models/Schedule";

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
    },
    procedures: {
      type: new GraphQLList(require('./ProcedureType').default),
      resolve(model) {
        return Procedure.find({ _doctor_id: model._id });
      }
    },
    schedules: {
      type: new GraphQLList(require('./ScheduleType').default),
      resolve(model) {
        return Schedule.find({ _doctor_id: model._id });
      }
    }
  })
});

export default DoctorType;