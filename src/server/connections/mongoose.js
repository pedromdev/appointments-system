import mongoose from 'mongoose';
import mongodb from '../configurations/mongodb';

import logger from '../utils/logger';

const mongooseOpts = {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true,
  useCreateIndex: true,
  dbName: 'appointment'
};

export default {
  async open() {
    const uri = await mongodb.getConnectionUri('appointment');
    logger('Connecting to MongoDB server...');
    await mongoose.connect(uri, mongooseOpts);
  },
  async close() {
    await mongoose.disconnect();

    if (process.env.NODE_ENV === 'test') {
      await mongodb.getMongoD().stop();
    }
  }
};