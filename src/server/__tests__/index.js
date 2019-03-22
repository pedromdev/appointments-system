

// beforeAll(async () => {
//   console.log(`Connecting to MongoDB Memory Server: ${global.__MONGO_URI__}`);
//   mongoose.connect(
//     global.__MONGO_URI__,
//     {
//       dbName: global.__MONGO_DB_NAME__,
//       useNewUrlParser: true
//     }
//   )
// });
//
// afterAll(async () => {
//   mongoose.connection.close();
// });

test('no tests', () => {
  jest.setTimeout(6000);
});