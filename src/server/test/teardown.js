const MongooseConnection = require('../connections/mongoose').default;

module.exports = async () => {
  console.log('Teardown MongoDB Test Environment');
  await MongooseConnection.close();
};