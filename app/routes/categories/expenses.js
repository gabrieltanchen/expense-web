import Route from '@ember/routing/route';
import { get } from '@ember/object';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  queryParams: {
    create: {
      refreshModel: true,
    },
  },

  async beforeModel() {
    if (!(await get(this, 'session').isLoggedIn())) {
      this.transitionTo('login');
    }
  },

  model(params) {
    let newExpense = null;
    if (params.create === 'true') {
      newExpense = this.store.createRecord('expense', {
        category: this.store.peekRecord('category', params.category_uuid),
      });
    }
    return RSVP.hash({
      category: get(this, 'store').findRecord('category', params.category_uuid),
      newExpense,
    });
  },
});
