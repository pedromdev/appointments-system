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
});

export default model('Schedule', ScheduleSchema);