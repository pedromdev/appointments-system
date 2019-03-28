import {Schema, model} from 'mongoose';
import Doctor from './Doctor';

const ProcedureSchema = new Schema({
  _doctor_id: {
    type: Schema.Types.ObjectId,
    required: [true, 'É necessário informar o responsável pelo procedimento'],
  },
  name: {
    type: String,
    required: [true, 'É necessário informar o nome do procedimento'],
    minlength: [3, 'O nome do procedimento deve ter pelo menos 3 caracteres']
  }
});

ProcedureSchema.methods.getDoctor = async function() {
  return await Doctor.findById(this._doctor_id);
};

export default model('Procedure', ProcedureSchema);