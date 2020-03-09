require('../environment')
const NodeEnvironment = require('jest-environment-node')

const database = require('../test/database')

class ServerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
  }

  async setup() {
    console.log('Setup MongoDB Test Environment')

    await super.setup()
    await database.start()
  }

  async teardown() {
    console.log('Teardown MongoDB Test Environment')

    await super.teardown()
    await database.stop()
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = ServerEnvironment
