import mongoose from 'mongoose';
import mongodb from '../configurations/mongodb';

const mongooseOpts = {
  autoReconnect: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true,
  dbName: 'appointment'
};

export default {
  async open() {
    const uri = await mongodb.getConnectionUri('appointment');
    await mongoose.connect(uri, mongooseOpts);
  },
  async close() {
    mongoose.connection.close();
    await mongodb.getMongoD().stop();
  }
};