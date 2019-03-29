import {Schema, model} from 'mongoose';

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
  }
});

export default model('Schedule', ScheduleSchema);