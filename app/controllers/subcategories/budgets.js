import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { set } from '@ember/object';
import BudgetValidations from '../../validations/budget';

export default Controller.extend({
  queryParams: ['create', 'limit', 'page'],
  BudgetValidations,
  meta: null,
  tableColumns: [{
    name: 'Year',
    propertyName: 'year',
  }, {
    name: 'Month',
    propertyName: 'month_name',
  }, {
    name: 'Budget',
    propertyName: 'budget',
  }],
  budgets: alias('model.budgets'),
  newBudget: alias('model.newBudget'),
  subcategory: alias('model.subcategory'),

  actions: {
    closeCreateForm() {
      set(this, 'create', null);
    },
    showCreateForm() {
      set(this, 'create', true);
    },
  },
});