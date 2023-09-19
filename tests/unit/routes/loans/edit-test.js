import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | loans/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:loans/edit');
    assert.ok(route);
  });
});
