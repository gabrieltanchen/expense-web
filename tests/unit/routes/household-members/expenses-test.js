import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | household-members/expenses', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const route = this.owner.lookup('route:household-members/expenses');
    assert.ok(route);
  });
});