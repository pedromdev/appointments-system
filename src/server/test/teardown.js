const MongooseConnection = require('../connections/mongoose').default;

module.exports = async () => {
  await MongooseConnection.close();
};