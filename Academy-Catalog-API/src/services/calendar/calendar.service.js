// Initializes the `calendar` service on path `/calendar`
const { Calendar } = require('./calendar.class');
const createModel = require('../../models/calendar.model');
const hooks = require('./calendar.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/calendar', new Calendar(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('calendar');

  service.hooks(hooks);
};
