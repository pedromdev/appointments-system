import mongoose from 'mongoose';
import mongodb from '../configurations/mongodb';

const mongooseOpts = {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true,
  dbName: 'appointment'
};

export default {
  async open() {
    const uri = await mongodb.getConnectionUri('appointment');
    console.log('Connecting to MongoDB server...');
    await mongoose.connect(uri, mongooseOpts);
  },
  async close() {
    await mongoose.disconnect();

    if (process.env.NODE_ENV === 'test') {
      await mongodb.getMongoD().stop();
    }
  }
};