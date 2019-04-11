import {
  GraphQLObjectType,
  GraphQLList
} from 'graphql';

// Types
import UserType from './queries/UserType';
import DoctorType from "./queries/DoctorType";

// Models
import User from "../models/User";
import Doctor from "../models/Doctor";

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      resolve(parentValue, { id }) {
        return User.findById(id);
      }
    },
    doctors: {
      type: new GraphQLList(DoctorType),
      resolve() {
        return Doctor.find({});
      }
    },
    doctor: {
      type: DoctorType,
      resolve(parentValue, { id }) {
        return Doctor.findById(id);
      }
    }
  }
});

export default QueryType;