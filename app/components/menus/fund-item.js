import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class MenusFundItemComponent extends Component {
  @service router;

  get isDetailsRoute() {
    return this.router.currentRouteName === 'funds.show';
  }

  get isSettingsRoute() {
    return this.router.currentRouteName === 'funds.settings';
  }
}