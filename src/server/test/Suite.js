import * as database from './database'

export default class Suite {
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
    describe(this.#title, () => {
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

export const suite = (title, tests) => new Suite(title, tests)
