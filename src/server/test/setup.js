const MongooseConnection = require('../connections/mongoose').default;
const MongoDBConfiguration = require('../configurations/mongodb').default;

const mongod = MongoDBConfiguration.getMongoD();

module.exports = async () => {
  console.log('\nSetup MongoDB Test Environment');

  if (!mongod.isRunning) {
    await mongod.start();
    await MongooseConnection.open();
  }

  global.__MONGOD__ = mongod;
};