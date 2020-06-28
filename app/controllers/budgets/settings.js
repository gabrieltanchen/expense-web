import Controller from '@ember/controller';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

export default class BudgetsSettingsController extends Controller {
  @alias('model') budget;
  @tracked showDeleteModal = false;
  @tracked deleteErrors = [];

  @action
  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  @action
  async deleteBudget(e) {
    e.preventDefault();
    const subcategoryId = this.budget.subcategory.get('id');
    try {
      await this.budget.destroyRecord();
      this.showDeleteModal = false;
      this.transitionToRoute('subcategories.budgets', subcategoryId);
    } catch (err) {
      this.budget.rollbackAttributes();
      let errors = ['An error occurred. Please try again later.'];
      if (err && err.errors) {
        errors = err.errors.map((error) => {
          return error.detail;
        });
      }
      this.deleteErrors = errors;
    }
  }

  @action
  openDeleteModal() {
    this.deleteErrors = [];
    this.showDeleteModal = true;
  }
}
