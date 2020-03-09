const { ObjectID } = require('mongodb')
const User = require('../../models/User').default
const Doctor = require('../../models/Doctor').default
const database = require('../../test/database')

const doid = new ObjectID('2530e03eecbb9aeabad86644')
const uoid = new ObjectID('1f1ad587397ce9e77ff6996e')

describe('Doctor model', () => {
  beforeAll(async () => {
    await database.start()
  })

  afterAll(async () => {
    await database.stop()
  })

  describe('Validations', () => {
    it('should return an error when I try to save a doctor without required fields', async () => {
      let doctor = new Doctor({})

      try {
        await doctor.save()
        fail(new Error('Doctor saved'))
      } catch (e) {
        expect(e.errors._user_id.message).toEqual(
          'É necessário informar o usuário'
        )
        expect(e.errors.medical_speciality.message).toEqual(
          'É necessário informar a especialidade'
        )
      }
    })

    it('should return an error when I try to save a doctor with a medical speciality with less than 3 characters', async () => {
      let doctor = new Doctor({
        _user_id: new ObjectID(),
        medical_speciality: 'ab'
      })

      try {
        await doctor.save()
        fail(new Error('Doctor saved'))
      } catch (e) {
        expect(e.errors.medical_speciality.message).toEqual(
          'A especialidade deve ter pelo menos 3 caracteres'
        )
      }
    })

    it('should return an error when I try to save a doctor with a medical speciality with less than 3 characters', async () => {
      let doctor = new Doctor({
        _user_id: doid,
        medical_speciality: 'abc'
      })
      let doctor2 = new Doctor({
        _user_id: doid,
        medical_speciality: 'abcd'
      })

      try {
        await doctor.save()
        await doctor2.save()
        fail(new Error('Doctor saved'))
      } catch (e) {
        expect(e.errors._user_id.message).toEqual(
          '2530e03eecbb9aeabad86644 já está registrado como especialista'
        )
      } finally {
        await Doctor.deleteMany({})
      }
    })
  })

  describe('Relationships', () => {
    let user

    beforeEach(async () => {
      user = new User({
        _id: uoid,
        name: 'abc',
        email: 'example@gmail.com',
        password: '123456'
      })

      await Doctor.deleteMany({})
      await user.save()
    })

    it('should retrieve a user from doctor model', async () => {
      const doctor = new Doctor({
        _user_id: uoid,
        medical_speciality: 'xyz'
      })

      await doctor.save()
      const doctorUser = await doctor.getUser()

      expect(`${doctorUser._id}`).toEqual(`${user._id}`)
    })
  })
})
