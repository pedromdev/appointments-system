const mongodb = require('../configurations/mongodb').default
const mongoose = require('../connections/mongoose').default
const User = require('../models/User').default
const Doctor = require('../models/Doctor').default
const Procedure = require('../models/Procedure').default
const Schedule = require('../models/Schedule').default

const database = {
  async start() {
    return mongodb.startServer().then(() => mongoose.connect())
  },
  async stop() {
    await this.clear()
    return mongoose.disconnect().then(() => mongodb.stopServer())
  },
  async clear(models = []) {
    if (!Array.isArray(models) || models.length === 0) {
      models = [User, Doctor, Procedure, Schedule]
    }
    await Promise.all(models.map(model => model.deleteMany({})))
  }
}

module.exports = database
