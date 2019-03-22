import mongoose from 'mongoose';
import mongodb from '../configurations/mongodb';

const mongooseOpts = {
  autoReconnect: false,
  // reconnectTries: Number.MAX_VALUE,
  // reconnectInterval: 1000,
  useNewUrlParser: true,
  dbName: 'appointment'
};

export default {
  async open() {
    const uri = await mongodb.getConnectionUri('appointment');
    console.log('Uri retrieved');
    console.log(uri);
    mongoose.connect(uri, mongooseOpts);
    // mongoose.on('open', () => console.log('Openned connection'))
  },
  async close() {
    mongoose.connection.close();
    await mongodb.getMongoD().stop();
  }
};