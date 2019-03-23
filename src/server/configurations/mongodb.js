import MongoMemoryServer from 'mongodb-memory-server';

let mongod;

if (process.env.NODE_ENV === 'test') {
  mongod = new MongoMemoryServer({
    autoStart: false
  });
}

export default {
  getMongoD() {
    return mongod;
  },
  async getConnectionUri() {
    if (process.env.NODE_ENV === 'test') {
      if (!mongod.isRunning) {
        console.log('Starting MongoDB Memory Server...');
        await mongod.start();
      }
      return await mongod.getConnectionString();
    } else {
      return process.env.MONGODB_URI;
    }
  }
}