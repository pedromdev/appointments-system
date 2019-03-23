const User = require('../../models/User').default;
const MongooseConnection = require('../../connections/mongoose').default;

jest.setTimeout(15000);

describe('User model', () => {

  beforeAll(async () => {
    await MongooseConnection.open();
  });

  afterAll(async () => {
    await MongooseConnection.close();
  });

  describe('Validations', () => {

    it('should returns an error when I try to save a user without required fields', async () => {
      let user = new User();

      try {
        await user.save();
        fail(new Error('User saved'));
      } catch (e) {
        expect(e.errors.name.message).toEqual('É preciso informar o nome');
        expect(e.errors.email.message).toEqual('É preciso informar o e-mail');
        expect(e.errors.password.message).toEqual('É preciso informar a senha');
      }
    });

    it('should returns an error when I try to save a user with a name with less than 3 characters', async () => {
      let user = new User({
        name: 'ab',
        email: 'example@gmail.com',
        password: '123456'
      });

      try {
        await user.save();
        fail(new Error('User saved'));
      } catch (e) {
        expect(e.errors.name.message).toEqual('O nome precisa ter pelo menos 3 caracteres');
      }
    });

    it('should returns an error when I try to save a user with a password with less than 6 characters', async () => {
      let user = new User({
        name: 'abc',
        email: 'example@gmail.com',
        password: '12345'
      });

      try {
        await user.save();
        fail(new Error('User saved'));
      } catch (e) {
        expect(e.errors.password.message).toEqual('A senha deve ter pelo menos 6 caracteres');
      }
    });

    it('should returns an error when I try to save a user with an invalid email', async () => {
      let user = new User({
        name: 'abc',
        email: 'example',
        password: '123456'
      });

      try {
        await user.save();
        fail(new Error('User saved'));
      } catch (e) {
        expect(e.errors.email.message).toEqual('example não é um e-mail válido');
      }
    });

    it('should returns an error when I try to save a user with an existing email', async () => {
      let user = new User({
        name: 'abc',
        email: 'example@gmail.com',
        password: '123456'
      });
      let user2 = new User({
        name: 'abc2',
        email: 'example@gmail.com',
        password: '654321'
      });

      try {
        await user.save();

        try {
          await user2.save();
          fail(new Error('User2 saved'));
        } catch (e) {
          expect(e.errors.email.message).toEqual('example@gmail.com já está registrado');
        }
      } catch (e) {
        fail(e);
      }
    });

  });

});