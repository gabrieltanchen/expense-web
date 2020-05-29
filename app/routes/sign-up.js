import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),

  async beforeModel() {
    if (await get(this, 'session').isLoggedIn()) {
      this.transitionTo('dashboard');
    }
  },

  model() {
    return this.store.createRecord('user');
  },
});