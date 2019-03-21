import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório']
  },
  email: {
    type: String,
    required: [true, 'E-mail é obrigatório'],
    unique: [true, 'O e-mail informado já está cadastrado'],
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  }
});

export default model('User', UserSchema);