import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Person } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  // Person's information that is being viewed
  person: Person;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {

    // Get person information from presenter
    this.person = navParams.get('person');
  }

  dismiss(action) {

    // Called when user clicks on any of the 3 buttons or when the modal is closed
    // If the 3 buttons were not pressed, action should be undefined
    this.viewCtrl.dismiss({
      action: action
    });
  }

}
