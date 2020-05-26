import Controller from '@ember/controller';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';

export default class HouseholdMembersIndexController extends Controller {
  queryParams = ['page']

  @alias('model') householdMembers;
  @tracked page = null;

  tableColumns = [{
    linkTo: 'household-members.show',
    name: 'Name',
    propertyName: 'name',
  }, {
    name: 'Created At',
    propertyName: 'createdAt',
  }]

  @action
  setPage(page) {
    this.page = page;
  }
}
