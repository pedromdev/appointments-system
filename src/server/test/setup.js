const MongooseConnection = require('../connections/mongoose').default;

module.exports = async () => {
  console.log('\nSetup MongoDB Test Environment');
  await MongooseConnection.open();
};