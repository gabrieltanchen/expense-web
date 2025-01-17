import { module, test } from 'qunit';
import {
  click,
  currentURL,
  fillIn,
  visit,
} from '@ember/test-helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { selectChoose } from 'ember-power-select/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { v4 as uuidv4 } from 'uuid';

module('Acceptance | income', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function() {
    const session = this.owner.lookup('service:session');
    session.logout();
    session.authToken = 'token';
  });

  test('visiting /income', async function(assert) {
    await visit('/income');

    assert.equal(currentURL(), '/income');
    assert.dom('.container-lg').exists();
    assert.dom('h1').exists();
    assert.dom('h1').containsText('Income');
    assert.dom('.pagination-header').exists();
    assert.dom('.pagination-header .buttons').exists();
    assert.dom('.pagination-header .buttons a').exists({ count: 1 });
    assert.dom('.pagination-header .buttons a').containsText('New');
    assert.dom('.pagination-header nav.pagination').exists();
    assert.dom('table').exists();
    assert.dom('table tbody tr').exists({ count: 25 });

    await click('.pagination-next button');

    assert.equal(currentURL(), '/income?page=2');
    assert.dom('table tbody tr').exists({ count: 1 });

    await click('.pagination-previous button');

    assert.equal(currentURL(), '/income?page=1');
    assert.dom('table tbody tr').exists({ count: 25 });

    await click('.pagination-header .buttons a');

    assert.equal(currentURL(), '/income/new');
  });

  test('visiting /income/new', async function(assert) {
    await visit('/income/new');

    assert.equal(currentURL(), '/income/new');
    assert.dom('.container-sm').exists();
    assert.dom('h1').exists();
    assert.dom('h1').containsText('New Income');
    assert.dom('form').exists();
    assert.dom('#income-date-input').exists();
    assert.dom('#income-description-input').exists();
    assert.dom('#income-amount-input').exists();
    assert.dom('#income-submit').exists();
    assert.dom('.callout.alert').doesNotExist();
  });

  test('should render errors from api when creating income', async function(assert) {
    await visit('/income/new');

    assert.equal(currentURL(), '/income/new');

    await fillIn('#income-date-input', '2020-01-01');
    await selectChoose('#income-household-member-select', '.ember-power-select-option', 2);
    await fillIn('#income-description-input', 'Error Income');
    await fillIn('#income-amount-input', '23.45');
    await click('#income-submit');

    assert.dom('.callout.alert').exists();
    assert.dom('.callout.alert p').exists({ count: 2 });
    assert.dom('.callout.alert p:nth-of-type(1)').containsText('Test income post error 1.');
    assert.dom('.callout.alert p:nth-of-type(2)').containsText('Test income post error 2.');
  });

  test('should transition to income index page after creating income', async function(assert) {
    await visit('/income/new');

    assert.equal(currentURL(), '/income/new');

    await fillIn('#income-date-input', '2020-01-01');
    await selectChoose('#income-household-member-select', '.ember-power-select-option', 2);
    await fillIn('#income-description-input', 'New Income');
    await fillIn('#income-amount-input', '23.45');
    await click('#income-submit');

    assert.equal(currentURL(), '/income');
  });

  test('visiting /income/:id', async function(assert) {
    const id = uuidv4();
    await visit(`/income/${id}`);

    assert.equal(currentURL(), `/income/${id}`);
    assert.dom('.container-lg').exists();
    assert.dom('h1').exists();
    assert.dom('h1').containsText('View Income');
    assert.dom('nav.secondary').exists();
    assert.dom('table').exists();
    assert.dom('table tbody tr').exists({ count: 6 });
    assert.dom('table tbody tr:nth-of-type(1) td:nth-of-type(1)').containsText('ID');
    assert.dom('table tbody tr:nth-of-type(2) td:nth-of-type(1)').containsText('Date');
    assert.dom('table tbody tr:nth-of-type(3) td:nth-of-type(1)').containsText('Amount');
    assert.dom('table tbody tr:nth-of-type(4) td:nth-of-type(1)').containsText('Member');
    assert.dom('table tbody tr:nth-of-type(5) td:nth-of-type(1)').containsText('Employer');
    assert.dom('table tbody tr:nth-of-type(6) td:nth-of-type(1)').containsText('Description');
  });

  test('visiting /income/:id/edit', async function(assert) {
    const id = uuidv4();
    await visit(`/income/${id}/edit`);

    assert.equal(currentURL(), `/income/${id}/edit`);
    assert.dom('.container-lg').exists();
    assert.dom('h1').exists();
    assert.dom('h1').containsText('Edit Income');
    assert.dom('nav.secondary').exists();
    assert.dom('form').exists();
    assert.dom('#income-date-input').exists();
    assert.dom('#income-description-input').exists();
    assert.dom('#income-amount-input').exists();
    assert.dom('#income-submit').exists();
    assert.dom('.callout.alert').doesNotExist();
  });

  test('should render errors from api when editing income', async function(assert) {
    await visit('/income/09571b16-7f41-404a-8387-a18b97cbad8e/edit');

    assert.equal(currentURL(), '/income/09571b16-7f41-404a-8387-a18b97cbad8e/edit');

    await fillIn('#income-description-input', 'Updated Income');
    await fillIn('#income-amount-input', '45.67');
    await click('#income-submit');

    assert.dom('.callout.alert').exists();
    assert.dom('.callout.alert p').exists({ count: 2 });
    assert.dom('.callout.alert p:nth-of-type(1)').containsText('Test income patch error 1.');
    assert.dom('.callout.alert p:nth-of-type(2)').containsText('Test income patch error 2.');

    // Test that the income gets reset after navigating away from edit page.
    await click('nav.secondary ul li:nth-of-type(1) a');

    assert.equal(currentURL(), '/income/09571b16-7f41-404a-8387-a18b97cbad8e');
    assert.dom('table tr:nth-of-type(3) td:nth-of-type(2)').containsText('$10.00');
    assert.dom('table tr:nth-of-type(6) td:nth-of-type(2)').containsText('Test Income');
  });

  test('should transition to income details after editing income', async function(assert) {
    const id = uuidv4();
    await visit(`/income/${id}/edit`);

    assert.equal(currentURL(), `/income/${id}/edit`);

    await fillIn('#income-description-input', 'Updated Income');
    await fillIn('#income-amount-input', '45.67');
    await click('#income-submit');

    assert.equal(currentURL(), `/income/${id}`);
  });

  test('visiting /income/:id/settings', async function(assert) {
    const id = uuidv4();
    await visit(`/income/${id}/settings`);

    assert.equal(currentURL(), `/income/${id}/settings`);
    assert.dom('.container-lg').exists();
    assert.dom('.container-lg h1').exists();
    assert.dom('.container-lg h1').containsText('View Income');
    assert.dom('.container-lg nav.secondary').exists();
    assert.dom('.container-sm').exists();
    assert.dom('.container-sm a').exists();
    assert.dom('.container-sm a').hasClass('button');
    assert.dom('.container-sm a').containsText('Edit');
    assert.dom('.container-sm button').exists();
    assert.dom('.container-sm button').hasClass('button');
    assert.dom('.container-sm button').hasClass('alert');
    assert.dom('.container-sm button').containsText('Delete');
    assert.dom('.overlay').doesNotExist();

    await click('.container-sm button.button.alert');

    assert.dom('.overlay').exists();
    assert.dom('.overlay .modal').exists();
    assert.dom('.overlay .modal .callout').doesNotExist();
    assert.dom('.overlay .modal > p').exists();
    assert.dom('.overlay .modal > p').containsText('Are you sure you want to delete this income?');
    assert.dom('.overlay .modal button.button.alert').exists();
    assert.dom('.overlay .modal button.button.alert').containsText('Delete');
    assert.dom('.overlay .modal button.button.cancel').exists();
    assert.dom('.overlay .modal button.button.cancel').containsText('Cancel');

    await click('.overlay .modal button.button.cancel');

    assert.dom('.overlay').doesNotExist();

    await click('.container-sm a');

    assert.equal(currentURL(), `/income/${id}/edit`);
  });

  test('renders callout when deleting income returns errors', async function(assert) {
    await visit('/income/b2a60746-3bb4-47b6-978a-4af4cdb68d2e/settings');

    assert.equal(currentURL(), '/income/b2a60746-3bb4-47b6-978a-4af4cdb68d2e/settings');
    assert.dom('.container-sm button.button.alert').exists();

    await click('.container-sm button.button.alert');

    assert.dom('.overlay .modal button.button.alert').exists();

    await click('.overlay .modal button.button.alert');

    assert.equal(currentURL(), '/income/b2a60746-3bb4-47b6-978a-4af4cdb68d2e/settings');
    assert.dom('.overlay .modal .callout').exists();
    assert.dom('.overlay .modal .callout').hasClass('alert');
    assert.dom('.overlay .modal .callout p').exists({ count: 2 });
    assert.dom('.overlay .modal .callout p:nth-of-type(1)').containsText('Test income delete error 1.');
    assert.dom('.overlay .modal .callout p:nth-of-type(2)').containsText('Test income delete error 2.');

    await click('.overlay .modal button.button.cancel');

    assert.dom('.overlay').doesNotExist();

    // Verify the error callout is cleared when opening the modal again.
    await click('.container-sm button.button.alert');

    assert.dom('.overlay').exists();
    assert.dom('.overlay .modal .callout').doesNotExist();
  });

  test('transitions to /income on successful income deletion', async function(assert) {
    const id = uuidv4();
    await visit(`/income/${id}/settings`);

    assert.equal(currentURL(), `/income/${id}/settings`);
    assert.dom('.container-sm button.button.alert').exists();

    await click('.container-sm button.button.alert');

    assert.dom('.overlay .modal button.button.alert').exists();

    await click('.overlay .modal button.button.alert');

    assert.equal(currentURL(), '/income');
  });
});
