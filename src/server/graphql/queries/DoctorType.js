import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import UserType from './UserType'
import Procedure from '../../models/Procedure'
import Schedule from '../../models/Schedule'
import { procedure, schedule } from './arguments'
import { parseDateQuery, stringToRegexp } from '../../helpers'

const DoctorType = new GraphQLObjectType({
  name: 'DoctorType',
  fields: () => ({
    id: { type: GraphQLID },
    medical_speciality: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(model) {
        return model.getUser()
      }
    },
    procedures: {
      type: new GraphQLList(require('./ProcedureType').default),
      args: {
        ...procedure
      },
      resolve(model, query) {
        query = stringToRegexp(query, ['name'])
        return Procedure.find({ _doctor_id: model._id, ...query })
      }
    },
    schedules: {
      type: new GraphQLList(require('./ScheduleType').default),
      args: {
        ...schedule
      },
      resolve(model, query) {
        query = parseDateQuery(query, 'datetime')
        return Schedule.find({ _doctor_id: model._id, ...query })
      }
    }
  })
})

export default DoctorType
