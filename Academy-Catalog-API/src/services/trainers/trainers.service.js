// Initializes the `trainers` service on path `/trainers`
const { Trainers } = require('./trainers.class');
const createModel = require('../../models/trainers.model');
const hooks = require('./trainers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/trainers', new Trainers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trainers');

  service.hooks(hooks);
};
