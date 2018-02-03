import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public apiProvider: ApiProvider
  ) {

  }

  login() {
    let name = 'Placeholder Name';

    // Call API to login using name
    // Go back to LoadingPage to which should redirect user to TabsPage
    this.apiProvider.login(name).subscribe(
      next => this.navCtrl.setRoot('LoadingPage', {}, {
        animate: true,
        direction: 'back'
      })
    );
  }

}
