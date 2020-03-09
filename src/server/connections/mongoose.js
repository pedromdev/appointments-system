import mongoose from 'mongoose'

const mongooseOpts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  dbName: 'appointment'
}

export default {
  async connect() {
    return mongoose.connect(process.env.MONGODB_URI, mongooseOpts)
  },
  async disconnect() {
    await mongoose.disconnect()
  }
}
