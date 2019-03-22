import MongoMemoryServer from 'mongodb-memory-server';

let mongod;

if (process.env.NODE_ENV === 'test') {
  mongod = new MongoMemoryServer({
    autoStart: true,
    // debug: true
  });
}

export default {
  mongod,
  async getConnectionUri() {
    if (process.env.NODE_ENV === 'test') {
      return await mongod.getConnectionString('appointment');
    } else {
      return process.env.MONGODB_URI;
    }
  }
}