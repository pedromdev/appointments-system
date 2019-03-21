const MongoDBConfiguration = require('../configurations/mongodb').default;

const mongod = MongoDBConfiguration.getMongoD();

module.exports = async () => {
  await mongod.stop();
};