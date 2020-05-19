import { module, test } from 'qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | logged in redirects', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    const session = this.owner.lookup('service:session');
    session.logout();
    session.authToken = 'token';
  });

  test('should redirect away from /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/dashboard');
  });

  test('can visit /dashboard', async function(assert) {
    await visit('/dashboard');

    assert.equal(currentURL(), '/dashboard');
  });

  test('should redirect away from /login', async function(assert) {
    await visit('/login');

    assert.equal(currentURL(), '/dashboard');
  });
});
