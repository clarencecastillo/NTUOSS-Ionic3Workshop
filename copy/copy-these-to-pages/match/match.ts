import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, App } from 'ionic-angular';
import { Person, ApiProvider } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
})
export class MatchPage {

  // User information
  // Used to display user image
  user: Person;

  // Matched person information
  // Used to display image and name
  person: Person;

  // Used to open ChatPage which requires the matchId
  matchId: number;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public apiProvider: ApiProvider,
    public app: App
  ) {

    // Get person and matchId from presenter
    this.person = navParams.get('person');
    this.matchId = navParams.get('matchId');
  }

  ionViewDidLoad() {

    // Fetch user information
    this.apiProvider.getUser().subscribe(user => this.user = user);
  }

  dismiss() {

    // Dismiss this modal
    this.viewCtrl.dismiss();
  }

  share() {

    // Display toast message when user clicks on the share button
    this.toastCtrl.create({
      message: 'Nice try! You don\'t have any :(',
      duration: 5000
    }).present();
  }

  goToChatPage() {

    // Dismiss this modal before opening ChatPage
    this.dismiss();
    this.app.getRootNav().push('ChatPage', {
      matchId: this.matchId
    });
  }

}
