const database = require('../test/database')

module.exports = async () => {
  await database.stop()
}
