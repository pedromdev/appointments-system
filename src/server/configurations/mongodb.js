import MongoMemoryServer from 'mongodb-memory-server';

let mongoMemoryServer;

if (process.env.NODE_ENV === 'test') {
    mongoMemoryServer = new MongoMemoryServer();
}

export const getConnectionUri = async () => {
    if (process.env.NODE_ENV === 'test') {
        return await mongoMemoryServer.getConnectionString('appointment');
    } else {
        return process.env.MONGODB_URI;
    }
};