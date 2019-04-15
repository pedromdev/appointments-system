import {GraphQLID, GraphQLObjectType, GraphQLString, GraphQLList} from 'graphql';

import Doctor from "../../models/Doctor";
import Schedule from "../../models/Schedule";

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    doctor: {
      type: require('./DoctorType').default,
      resolve(model) {
        return Doctor.findOne({ _user_id: model._id });
      }
    },
    schedules: {
      type: new GraphQLList(require('./ScheduleType').default),
      resolve(model) {
        return Schedule.find({ _user_id: model._id });
      }
    }
  })
});

export default UserType;