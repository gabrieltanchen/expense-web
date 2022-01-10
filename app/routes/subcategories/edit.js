import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SubcategoriesEditRoute extends Route {
  @service session;
  @service store;

  async beforeModel() {
    if (!(await this.session.isLoggedIn())) {
      this.transitionTo('login');
    }
  }

  model(params) {
    return this.store.findRecord('subcategory', params.subcategory_id);
  }

  resetController(controller) {
    if (controller.subcategory && controller.subcategory.hasDirtyAttributes) {
      controller.subcategory.rollbackAttributes();
    }
  }
}
