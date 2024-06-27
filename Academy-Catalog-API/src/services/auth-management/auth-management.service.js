// Initializes the `auth-management` service on path `/auth-management`
const { AuthManagement } = require("./auth-management.class");
const createModel = require("../../models/auth-management.model");
const hooks = require("./auth-management.hooks");
const notifier = require("./notifier");
const {
  AuthenticationManagementService,
} = require("feathers-authentication-management");
module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use(
    "/auth-management",
    new AuthenticationManagementService(app, {
      notifier: notifier(app),
    })
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("auth-management");

  service.hooks(hooks);
};
