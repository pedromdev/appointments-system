import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'

import Doctor from '../../models/Doctor'
import Schedule from '../../models/Schedule'
import { schedule } from './arguments'
import { parseDateQuery } from '../../helpers'

const MeType = new GraphQLObjectType({
  name: 'MeType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    doctor: {
      type: require('./DoctorType').default,
      resolve(model) {
        return Doctor.findOne({ _user_id: model._id })
      }
    },
    schedules: {
      type: new GraphQLList(require('./ScheduleType').default),
      args: {
        ...schedule
      },
      resolve(model, query) {
        query = parseDateQuery(query, 'datetime')
        return Schedule.find({ _user_id: model._id, ...query })
      }
    }
  })
})

export default MeType
