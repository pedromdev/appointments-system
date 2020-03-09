import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} from 'graphql'

// Types
import UserType from './queries/UserType'
import DoctorType from './queries/DoctorType'
import ProcedureType from './queries/ProcedureType'
import ScheduleType from './queries/ScheduleType'

// Models
import User from '../models/User'
import Doctor from '../models/Doctor'
import Procedure from '../models/Procedure'
import Schedule from '../models/Schedule'
import { stringToRegexp } from '../helpers'
import MeType from './queries/MeType'

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    me: {
      type: MeType,
      resolve(model, query, req) {
        return req.user
      }
    },
    users: {
      type: new GraphQLList(UserType),
      args: { name: { type: GraphQLString } },
      resolve(parentValue, query) {
        query = stringToRegexp(query, ['name'])
        return User.find(query)
      }
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return User.findById(id)
      }
    },
    doctors: {
      type: new GraphQLList(DoctorType),
      args: { medical_speciality: { type: GraphQLString } },
      resolve(parentValue, query) {
        query = stringToRegexp(query, ['medical_speciality'])
        return Doctor.find(query)
      }
    },
    doctor: {
      type: DoctorType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Doctor.findById(id)
      }
    },
    procedures: {
      type: new GraphQLList(ProcedureType),
      args: {
        name: { type: GraphQLString },
        duration: { type: GraphQLInt }
      },
      resolve(parentValue, query) {
        query = stringToRegexp(query, ['name'])
        return Procedure.find(query)
      }
    },
    procedure: {
      type: ProcedureType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Procedure.findById(id)
      }
    },
    schedules: {
      type: new GraphQLList(ScheduleType),
      args: {
        note: { type: GraphQLString }
      },
      resolve(parentValue, query) {
        query = stringToRegexp(query, ['note'])
        return Schedule.find(query)
      }
    },
    schedule: {
      type: ScheduleType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Schedule.findById(id)
      }
    }
  }
})

export default QueryType
