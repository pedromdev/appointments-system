import mongoose from 'mongoose';
import mongodb from '../configurations/mongodb';

const mongooseOpts = {
  // autoReconnect: true,
  // reconnectTries: Number.MAX_VALUE,
  // reconnectInterval: 1000,
  useNewUrlParser: true
};
const mongooseConnection = mongoose.createConnection();

export default {
  async open() {
    const uri = await mongodb.getConnectionUri();
    mongooseConnection.openUri(uri, mongooseOpts);
    mongooseConnection.once('open', () => {
      console.log(`MongoDB successfully connected to ${uri}`);
    });
  },
  async close() {
    mongoose.connection.close();
  }
};