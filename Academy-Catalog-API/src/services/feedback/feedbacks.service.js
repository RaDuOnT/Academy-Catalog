// Initializes the `feedback` service on path `/feedback`
const { Feedbacks } = require('./feedbacks.class');
const createModel = require('../../models/feedbacks.model');
const hooks = require('./feedbacks.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/feedbacks', new Feedbacks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('feedbacks');

  service.hooks(hooks);
};
