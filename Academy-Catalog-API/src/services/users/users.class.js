const { Service } = require("feathers-mongoose");

exports.Users = class Users extends Service {
  async create(data, params) {
    // const sendEmail = await app.service("emails").create(email);

    return super.create(data, params);
  }
};
