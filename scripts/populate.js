import mongooseConnection from '../src/server/connections/mongoose';

import User from '../src/server/models/User'
import Doctor from '../src/server/models/Doctor'

mongooseConnection.open().then(async () => {
  let user = new User({
    name: 'Pedro Alves',
    email: 'pedro.alves@gmail.com',
    password: '01323442',
    email_verified: true
  });

  await user.save();

  let doctor = new Doctor({
    _user_id: user._id,
    medical_speciality: 'Fisioterapeuta'
  });

  await doctor.save();

  console.log(await User.find({}));

  mongooseConnection.close().then(() => {
    console.log('Database connection closed');
  })
});