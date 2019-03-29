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
    validate: {
      async validator(datetime) {
        if (!this.isNew) return true;

        let { _doctor_id } = this;
        let schedule = await this.findOne({ datetime, _doctor_id });

        return schedule === null || schedule.status !== 'CONFIRMED';
      },
      message: 'O horário informado já foi marcado'
    }
  }
});

export default model('Schedule', ScheduleSchema);