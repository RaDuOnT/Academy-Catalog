const users = require('./users/users.service.js');
const trainers = require('./trainers/trainers.service.js');
const students = require('./students/students.service.js');
const feedbacks = require('./feedback/feedbacks.service.js');
const calendar = require('./calendar/calendar.service.js');
const courses = require('./courses/courses.service.js');
const resources = require('./resources/resources.service.js');
const authManagement = require('./auth-management/auth-management.service.js');
const emails = require('./emails/emails.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(students);
  app.configure(users);
  app.configure(trainers);
  app.configure(calendar);
  app.configure(feedbacks);
  app.configure(courses);
  app.configure(resources);
  app.configure(authManagement);
  app.configure(emails);
};
