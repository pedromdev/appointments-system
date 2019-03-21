import MongoMemoryServer from 'mongodb-memory-server';

let mongod;

if (process.env.NODE_ENV === 'test') {
  mongod = new MongoMemoryServer({
    autoStart: false,
    debug: true
  });
}

export default {
  getMongoD() {
    return mongod;
  },
  async getConnectionUri() {
    if (process.env.NODE_ENV === 'test') {
      return await mongod.getConnectionString();
    } else {
      return process.env.MONGODB_URI;
    }
  }
}