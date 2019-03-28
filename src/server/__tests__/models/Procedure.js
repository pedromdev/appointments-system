const Doctor = require('../../models/Doctor').default;
const Procedure = require('../../models/Procedure').default;
const MongooseConnection = require('../../connections/mongoose').default;
const {ObjectID} = require('mongodb');

const doid = new ObjectID('2530e03eecbb9aeabad86644');
const uoid = new ObjectID('1f1ad587397ce9e77ff6996e');

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

    it('should return an error when I try to save a procedure with a name less than 3 characters', async () => {
      const procedure = new Procedure({
        _doctor_id: new ObjectID(),
        name: 'ab'
      });

      try {
        await procedure.save();
        fail(new Error('Procedure saved'));
      } catch (e) {
        expect(e.errors.name.message).toEqual('O nome do procedimento deve ter pelo menos 3 caracteres');
      }
    });

  });

  describe('Relationship', () => {
    let doctor;

    beforeEach(async () => {
      doctor = new Doctor({
        _id: doid,
        _user_id: uoid,
        medical_speciality: 'abc'
      });

      await doctor.save();
    });

    afterEach(async () => {
      await Promise.all([
        Doctor.deleteMany({}),
        Procedure.deleteMany({})
      ]);
    });

    it('should retrieve a doctor from procedure model', async () => {
      let procedure = new Procedure({
        _doctor_id: doid,
        name: 'xyz'
      });

      try {
        await procedure.save();
        let procedureDoctor = await procedure.getDoctor();

        expect(procedureDoctor._id.toHexString()).toEqual(doctor._id.toHexString());
      } catch (e) {
        fail(e);
      }
    });

  });

});