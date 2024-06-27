const { authenticate } = require("@feathersjs/authentication").hooks;

const { hashPassword, protect } =
  require("@feathersjs/authentication-local").hooks;
const {
  addVerification,
  removeVerification,
} = require("feathers-authentication-management");
const authNotifier = require("../auth-management/notifier");
const sendVerify = () => {
  return async (context) => {
    const notifier = authNotifier(context.app);

    const users = Array.isArray(context.result)
      ? context.result
      : [context.result];

    await Promise.all(
      users.map(async (user) => notifier("resendVerifySignup", user))
    );
  };
};
module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [hashPassword("password"), addVerification("auth-management")],
    update: [hashPassword("password"), authenticate("jwt")],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
    ],
    find: [],
    get: [],
    create: [sendVerify(), removeVerification()],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
