import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import User from './User'

const DoctorSchema = new Schema({
  _user_id: {
    type: Schema.Types.ObjectId,
    required: [true, 'É necessário informar o usuário'],
    unique: true
  },
  medical_speciality: {
    type: String,
    required: [true, 'É necessário informar a especialidade'],
    minlength: [3, 'A especialidade deve ter pelo menos 3 caracteres']
  }
})

DoctorSchema.plugin(uniqueValidator, {
  message: '{VALUE} já está registrado como especialista'
})

DoctorSchema.methods.getUser = async function() {
  return await User.findById(this._user_id)
}

export default model('Doctor', DoctorSchema)
