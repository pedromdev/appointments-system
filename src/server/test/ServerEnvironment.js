const NodeEnvironment = require('jest-environment-node');
const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

class ServerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.mongod = new MongoMemoryServer({
      autoStart: false,
      // debug: true
    });
  }

  async setup() {
    console.log('Setup MongoDB Test Environment');

    if (!this.mongod.isRunning) {
      await this.mongod.start();
    }

    this.global.__MONGO_URI__ = await this.mongod.getConnectionString();

    global.__MONGO_URI__ = this.global.__MONGO_URI__;

    console.log(`Connecting to MongoDB Memory Server: ${global.__MONGO_URI__}`);
    await mongoose.connect(global.__MONGO_URI__, {
      // dbName: this.mongod.getDbName(),
      useNewUrlParser: true
    });
    // MongoClient.db(this.mongod.getDbName());

    await super.setup();
  }

  async teardown() {
    console.log('Teardown MongoDB Test Environment');

    mongoose.connection.close();
    await this.mongod.stop();

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = ServerEnvironment;