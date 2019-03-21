import mongoose from 'mongoose';
import mongodb from '../configurations/mongodb';

const mongooseOpts = {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true
};
const mongooseConnection = mongoose.createConnection();

export default {
  open() {
    mongodb.getConnectionUri().then(uri => {
      mongooseConnection.openUri(uri, mongooseOpts);
      mongooseConnection.once('open', () => {
        console.log(`MongoDB successfully connected to ${uri}`);
      });
    }).catch(e => console.error(e));
  },
  close() {
    mongoose.connection.close();
  }
};