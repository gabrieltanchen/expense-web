import Controller from '@ember/controller';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class ExpensesEditController extends Controller {
  @alias('model.expense') expense;
  @alias('model.funds') funds;
  @alias('model.householdMembers') householdMembers;
  @alias('model.subcategories') subcategories;
  @alias('model.vendors') vendors;

  @action
  transitionToExpenseDetails() {
    this.transitionToRoute('expenses.show', this.expense.id);
  }
}
