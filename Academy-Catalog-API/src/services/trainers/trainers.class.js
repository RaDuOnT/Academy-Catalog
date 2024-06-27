const { Service } = require('feathers-mongoose');
const {app} = require('../../app');


exports.Trainers = class Trainers extends Service {
  async create (data, params) {
    const user = super.create({
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      enabled: data.enabled
    }, params);

    const trainer = await app.services('trainers').create({
      userId: user._id,
      courses: data.courses
    }, params);

    return trainer;
  }
};
