const User = require('../../models/User').default;
const Doctor = require('../../models/Doctor').default;
const Procedure = require('../../models/Procedure').default;
const Schedule = require('../../models/Schedule').default;
const MongooseConnection = require('../../connections/mongoose').default;
const {ObjectID} = require('mongodb');

const doid = new ObjectID('2530e03eecbb9aeabad86644');
const uoid = new ObjectID('1f1ad587397ce9e77ff6996e');
const poid = new ObjectID('6110a840c9ad21c90b42d730');

let scheduleData = {
  _user_id: uoid,
  _doctor_id: doid,
  _procedure_id: poid,
  datetime: new Date('2030-02-12T12:00:00')
};

describe('Schedule model', () => {

  beforeAll(async () => {
    await MongooseConnection.open();
  });

  afterAll(async () => {
    await MongooseConnection.close();
  });

  describe('Validations', () => {

    afterEach(async () => {
      await Procedure.deleteMany({});
      await Schedule.deleteMany({});
    });

    it('should return an error when I try to save a schedule without required fields', async () => {
      let schedule = new Schedule({});

      try {
        await schedule.save();
        fail(new Error('Schedule saved'));
      } catch (e) {
        expect(e.errors._user_id.message).toEqual('É necessário informar quem está marcando um horário');
        expect(e.errors._doctor_id.message).toEqual('É necessário informar quem irá atender');
        expect(e.errors._procedure_id.message).toEqual('É necessário informar o procedimento a ser realizado');
        expect(e.errors.datetime.message).toEqual('É necessário informar o dia e o horário a serem marcados');
      }
    });

    it('should return an error when I try to save a schedule at the same datetime of another schedule', async () => {
      let schedule = new Schedule({...scheduleData, status: 'CONFIRMED'});
      let schedule2 = new Schedule(scheduleData);

      try {
        await schedule.save();
        await schedule2.save();
        fail(new Error('Schedule saved'));
      } catch (e) {
        expect(e.errors.datetime.message).toEqual('O horário informado já foi marcado');
      }
    });

    it('should return an error when I try to save a schedule at the moment of another', async () => {
      let procedure = new Procedure({
        _id: poid,
        name: 'xyz',
        _doctor_id: doid,
        duration: 60
      });
      let schedule = new Schedule({
        ...scheduleData,
        status: 'CONFIRMED',
        datetime: new Date('2030-02-12T12:00:00')
      });
      let schedule2 = new Schedule({
        ...scheduleData,
        datetime: new Date('2030-02-12T12:30:00')
      });

      try {
        await procedure.save();
        await schedule.save();
        await schedule2.save();
        fail(new Error('Schedule saved'));
      } catch (e) {
        expect(e.errors.datetime.message).toEqual('O horário informado não pode ser marcado, pois o especialista não poderá atender');
      }
    });

    it('should return an error when I try to save a schedule that conflits with another schedule in the future', async () => {
      let procedure = new Procedure({
        _id: poid,
        name: 'xyz',
        _doctor_id: doid,
        duration: 60
      });
      let schedule = new Schedule({
        ...scheduleData,
        status: 'CONFIRMED',
        datetime: new Date('2030-02-12T12:30:00')
      });
      let schedule2 = new Schedule({
        ...scheduleData,
        datetime: new Date('2030-02-12T12:00:00')
      });

      try {
        await procedure.save();
        await schedule.save();
        await schedule2.save();
        fail(new Error('Schedule saved'));
      } catch (e) {
        expect(e.errors.datetime.message).toEqual('O horário informado não pode ser marcado, pois o especialista não poderá atender');
      }
    });

  });

  describe('Relationships', () => {

    beforeEach(async () => {
      await Schedule.deleteMany({});
    });

    afterEach(async () => {
      await Schedule.deleteMany({});
    });

    it('should retrieve a user from schedule model', async () => {
      let user = new User({
        _id: uoid,
        name: 'abc',
        email: 'example@gmail.com',
        password: '123456'
      });
      let schedule = new Schedule(scheduleData);

      try {
        await user.save();
        await schedule.save();

        let scheduleUser = await schedule.getUser();

        expect(scheduleUser._id.toHexString()).toEqual(user._id.toHexString());
      } catch (e) {
        fail(e);
      } finally {
        User.deleteMany({});
      }
    });

    it('should retrieve a doctor from schedule model', async () => {
      let doctor = new Doctor({
        _id: doid,
        _user_id: uoid,
        medical_speciality: 'xyz'
      });
      let schedule = new Schedule(scheduleData);

      try {
        await doctor.save();
        await schedule.save();

        let scheduleDoctor = await schedule.getDoctor();

        expect(scheduleDoctor._id.toHexString()).toEqual(doctor._id.toHexString());
      } catch (e) {
        fail(e);
      } finally {
        Doctor.deleteMany({});
      }
    });

    it('should retrieve a procedure from schedule model', async () => {
      let procedure = new Procedure({
        _id: poid,
        _doctor_id: doid,
        name: 'xyz',
        duration: 60
      });
      let schedule = new Schedule(scheduleData);

      try {
        await procedure.save();
        await schedule.save();

        let scheduleProcedure = await schedule.getProcedure();

        expect(scheduleProcedure._id.toHexString()).toEqual(procedure._id.toHexString());
      } catch (e) {
        fail(e);
      } finally {
        Doctor.deleteMany({});
      }
    });

  });

});