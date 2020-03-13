import moment from 'moment'
import { ObjectId } from 'bson'
import { graphqlSuiteTest, graphqlTest } from '../../../test/graphql'
import { TEST_ME, TEST_ME_AS_DOCTOR, TEST_MY_SCHEDULES } from '../../../test/graphql/queries'

const id = new ObjectId()
const name = 'Test Name'
const email = 'test@email.com'
const password = '123456'
const emailVerified = true
const user = [id, name, email, password, emailVerified]

const doctorId = new ObjectId()
const medicalSpeciality = 'abc'
const doctor = [doctorId, id, medicalSpeciality]

const procedureId = new ObjectId()
const procedureName = 'Procedure 1'
const procedureDuration = 60
const procedure = [procedureId, doctorId, procedureName, procedureDuration]

const scheduleId = new ObjectId()
const scheduleNote = 'Schedule note'
const scheduleStatus = 'NEW'
const scheduleDatetime = moment('12/03/2020', 'DD/MM/YYYY').toDate()
const schedule = [scheduleId, id, new ObjectId(), procedureId, scheduleDatetime, scheduleStatus, scheduleNote]

graphqlSuiteTest('MeType', [
  graphqlTest('should retrieve my data')
    .withUser(...user)
    .authenticatedAs(id)
    .query({ query: TEST_ME })
    .expect('data.me.id', `${id}`)
    .expect('data.me.name', name)
    .expect('data.me.email', email),
  graphqlTest('me as a doctor')
    .withUser(...user)
    .withDoctor(...doctor)
    .authenticatedAs(id)
    .query({ query: TEST_ME_AS_DOCTOR })
    .expect('data.me.doctor.medical_speciality', medicalSpeciality),
  graphqlTest('should retireve my schedules')
    .withUser(...user)
    .withDoctor(...doctor)
    .withProcedure(...procedure)
    .withSchedule(...schedule)
    .authenticatedAs(id)
    .query({ query: TEST_MY_SCHEDULES })
    .expect('data.me.schedules[0].status', scheduleStatus)
    .expect('data.me.schedules[0].datetime', scheduleDatetime.toISOString())
    .expect('data.me.schedules[0].note', scheduleNote)
])
  .withDatabase()
  .run()


