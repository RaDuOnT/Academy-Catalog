const assert = require('assert');
const app = require('../../src/app');

describe('\'trainers\' service', () => {
  it('registered the service', () => {
    const service = app.service('trainers');

    assert.ok(service, 'Registered the service');
  });
});
