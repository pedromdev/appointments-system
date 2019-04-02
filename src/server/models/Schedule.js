import {Schema, model} from 'mongoose';

import User from './User';
import Doctor from './Doctor';
import Procedure from './Procedure';

const ScheduleSchema = new Schema({
  _user_id: {
    type: Schema.Types.ObjectId,
    required: [true, 'É necessário informar quem está marcando um horário'],
  },
  _doctor_id: {
    type: Schema.Types.ObjectId,
    required: [true, 'É necessário informar quem irá atender'],
  },
  _procedure_id: {
    type: Schema.Types.ObjectId,
    required: [true, 'É necessário informar o procedimento a ser realizado'],
  },
  status: {
    type: String,
    enum: [
      'NEW',
      'CONFIRMED',
      'CANCELLED',
    ],
    default: 'NEW'
  },
  datetime: {
    type: Date,
    required: [true, 'É necessário informar o dia e o horário a serem marcados'],
  },
  note: String
});

ScheduleSchema.path('datetime').validate(async function(datetime) {
  if (!this.isNew) return true;

  let { _doctor_id } = this;
  let schedule = await Schedule.findOne({ datetime, _doctor_id });

  return schedule === null || schedule.status !== 'CONFIRMED';
}, 'O horário informado já foi marcado');

ScheduleSchema.path('datetime').validate(async function(datetime) {
  if (!this.isNew) return true;

  let { _doctor_id } = this;
  let schedule = await Schedule.findOne({ datetime, _doctor_id });

  return schedule === null || schedule.status !== 'CONFIRMED';
}, 'O horário informado não pode ser marcado, pois o especialista não poderá atender');

ScheduleSchema.methods.getUser = async function() {
  return await User.findById(this._user_id);
};

ScheduleSchema.methods.getDoctor = async function() {
  return await Doctor.findById(this._doctor_id);
};

ScheduleSchema.methods.getProcedure = async function() {
  return await Procedure.findById(this._procedure_id);
};

const Schedule = model('Schedule', ScheduleSchema);

export default Schedule;