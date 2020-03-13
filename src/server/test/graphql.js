import { createTestClient } from 'apollo-server-testing'
import get from 'lodash.get'
import User from '../models/User'
import Doctor from '../models/Doctor'
import Procedure from '../models/Procedure'
import Schedule from '../models/Schedule'
import { ApolloServer } from 'apollo-server-express'
import Schema from '../graphql/Schema'
import Jwt from '../configurations/jwt'
import * as database from './database'

const saveItemHandler = (Model, items) => {
  return items.map(item => {
    item = new Model(item)
    return item.save()
  })
}

class GraphQLTest {
  #runned = false
  #title
  #user
  #token
  #expects = []
  #action
  #options

  #users = []
  #doctors = []
  #procedures = []
  #schedules = []

  constructor(title) {
    this.#title = title
    this.#token = Jwt.sign({ sub: 'guest' })
  }

  withUser(_id, name, email, password, email_verified) {
    this.#users.push({ _id, name, email, password, email_verified })
    return this
  }

  withDoctor(_id, _user_id, medical_speciality) {
    this.#doctors.push({ _id, _user_id, medical_speciality })
    return this
  }

  withProcedure(_id, _doctor_id, name, duration) {
    this.#procedures.push({ _id, _doctor_id, name, duration })
    return this
  }

  withSchedule(_id, _user_id, _doctor_id, _procedure_id, datetime, status, note) {
    this.#schedules.push({
      _id,
      _user_id,
      _doctor_id,
      _procedure_id,
      datetime,
      status,
      note
    })
    return this
  }

  authenticatedAs(user) {
    this.#user = user
    return this
  }

  query(options) {
    this.#action = 'query'
    this.#options = options
    return this
  }

  mutate(options) {
    this.#action = 'mutate'
    this.#options = options
    return this
  }

  expect(prop, callbackOrReceivedValue) {
    this.#expects.push({ prop, callbackOrReceivedValue })
    return this
  }

  run() {
    if (this.#runned) return

    test(this.#title, async () => {
      await Promise.all(saveItemHandler(User, this.#users))
      await Promise.all(saveItemHandler(Doctor, this.#doctors))
      await Promise.all(saveItemHandler(Procedure, this.#procedures))
      await Promise.all(saveItemHandler(Schedule, this.#schedules))

      const user = this.#user && await User.findById(this.#user) || undefined
      const token = user && user.getToken() || this.#token
      const server = new ApolloServer({
        schema: Schema,
        playground: false,
        context: { user, token }
      })
      const { mutate, query } = createTestClient(server)
      const action = this.#action === 'query' ? query : mutate

      const response = await action(this.#options)

      this.#expects.forEach(exp => {
        if (typeof exp.callbackOrReceivedValue === 'function') {
          exp.callbackOrReceivedValue(
            expect(get(response, exp.prop)),
            response
          )
        } else {
          expect(get(response, exp.prop)).toEqual(exp.callbackOrReceivedValue)
        }
      })
    })

    this.#runned = true

    return this
  }
}

class GraphqlSuiteTest {
  #title
  #tests
  #useDatabase = false

  constructor(title, tests) {
    this.#title = title
    this.#tests = tests
  }

  withDatabase() {
    this.#useDatabase = true
    return this
  }

  run() {
    describe(`GraphQL | ${this.#title}`, () => {
      if (this.#useDatabase) {
        beforeAll(async () => {
          await database.start()
        })

        afterAll(async () => {
          await database.stop()
        })

        afterEach(async () => {
          await database.clear()
        })
      }

      this.#tests.forEach(test => test.run())
    })
    return this
  }
}

export const graphqlTest = (title) => new GraphQLTest(title)
export const graphqlSuiteTest = (title, tests) => new GraphqlSuiteTest(title, tests)
