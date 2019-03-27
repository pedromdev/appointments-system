import {model, Schema} from 'mongoose';
import {isEmail} from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcryptjs';

import Jwt from '../configurations/jwt';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'É preciso informar o nome'],
    minlength: [3, 'O nome precisa ter pelo menos 3 caracteres'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'É preciso informar o e-mail'],
    unique: [true, 'O e-mail informado já está cadastrado'],
    trim: true,
    validate: {
      validator: isEmail,
      message: '{VALUE} não é um e-mail válido'
    }
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: [true, 'É preciso informar a senha'],
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres'],
  },
});

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} já está registrado'
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  next();
});

UserSchema.methods.getToken = function (scope = 'auth') {
  return Jwt.sign({
    sub: this._id.toHexString(),
    scope
  });
};

export default model('User', UserSchema);