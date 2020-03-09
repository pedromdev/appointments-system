import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer({
  instance: {
    auth: false,
    dbName: 'appointment',
    port: 27018
  },
  autoStart: false
})

export default {
  startServer() {
    return mongod.start()
  },
  stopServer() {
    return mongod.stop()
  }
}
