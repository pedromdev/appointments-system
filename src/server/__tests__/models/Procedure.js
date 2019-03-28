const Procedure = require('../../models/Procedure').default;
const MongooseConnection = require('../../connections/mongoose').default;

describe('Procedure model', () => {

  beforeAll(async () => {
    await MongooseConnection.open();
  });

  afterAll(async () => {
    await MongooseConnection.close();
  });

  describe('Validations', () => {

    it('should return an error when I try to save a procedure without required fields', async () => {
      const procedure = new Procedure({});

      try {
        await procedure.save();
        fail(new Error('Procedure saved'));
      } catch (e) {
        expect(e.errors._doctor_id.message).toEqual('É necessário informar o responsável pelo procedimento');
        expect(e.errors.name.message).toEqual('É necessário informar o nome do procedimento');
      }
    });

  })

});