import {ObjectID} from 'mongodb';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let store = [{
  _id: new ObjectID('b862e7a9c334472ce60fb2dd'),
  name: 'User One',
  email: 'userone@example.com',
  email_verified: true,
  password: bcrypt.hashSync('123456', salt)
}, {
  _id: new ObjectID('e45cc8000d23415a507e7ce3'),
  name: 'User Two',
  email: 'userotwo@example.com',
  email_verified: true,
  password: bcrypt.hashSync('654321', salt)
}];

export default class User {

  async save() {

  }
};