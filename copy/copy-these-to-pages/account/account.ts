import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { ApiProvider, Person } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  // User information
  // Used to display user image, name and age
  user: Person;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public events: Events,
    public apiProvider: ApiProvider
  ) {

    // Update user information if changed
    this.events.subscribe('account-changed', user => this.user = user);
  }

  ionViewDidLoad() {

    // Fetch user information
    this.apiProvider.getUser().subscribe(
      user => this.user = user
    );
  }

  // Need to use root nav for the following page navigation
  // Otherwise pages will be nested under the tabs navigation

  goToSettingsPage() {
    // Push SettingsPage to the root navigation
    this.app.getRootNav().push('SettingsPage');
  }

  goToEditAccountPage() {
    // Push EdditAccountPage to the root navigation
    this.app.getRootNav().push('EditAccountPage');
  }

}
