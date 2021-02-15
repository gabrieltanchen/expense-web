import Controller from '@ember/controller';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

export default class SubcategoriesExpensesController extends Controller {
  queryParams = ['page', 'sort', 'sortDirection'];

  @alias('model.expenses') expenses;
  @alias('model.subcategory') subcategory;
  @tracked page = null;
  @tracked sort = null;
  @tracked sortDirection = null;
  defaultSort = 'date';
  defaultSortDirection = 'desc';

  tableColumns = [{
    name: 'Date',
    propertyName: 'date',
    sortable: true,
    sortName: 'date',
  }, {
    name: 'Vendor',
    propertyName: 'vendor.name',
    sortable: true,
    sortName: 'vendor',
  }, {
    name: 'Member',
    propertyName: 'householdMember.name',
    sortable: true,
    sortName: 'member',
  }, {
    name: 'Description',
    propertyName: 'description',
    sortable: true,
    sortName: 'description',
  }, {
    name: 'Amount',
    propertyName: 'amountStr',
    sortable: true,
    sortName: 'amount',
  }, {
    name: 'Reimbursed Amount',
    propertyName: 'reimbursedAmountStr',
    sortable: true,
    sortName: 'reimbursed_amount',
  }, {
    linkText: 'View',
    linkTo: 'expenses.show',
    name: '',
  }, {
    linkText: 'Edit',
    linkTo: 'expenses.edit',
    name: '',
  }];

  @action
  setPage(page) {
    this.page = page;
  }

  @action
  setSort(sortName, sortDirection) {
    this.sort = sortName;
    this.sortDirection = sortDirection;
  }
}
