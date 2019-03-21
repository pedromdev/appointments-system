import mongoose from 'mongoose';
import {getConnectionUri} from '../configurations/mongodb';

const mongooseOpts = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true
};
const mongooseConnection = mongoose.createConnection();

getConnectionUri().then(uri => {
    mongooseConnection.openUri(uri, mongooseOpts);
    mongooseConnection.once('open', () => {
        console.log(`MongoDB successfully connected to ${uri}`);
    });
}).catch(e => console.error(e));

export default mongooseConnection;