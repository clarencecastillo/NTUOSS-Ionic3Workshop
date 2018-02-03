import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ApiProvider, Person } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html',
})
export class EditAccountPage {

  // User information
  // Used to display picture, name, age and description
  user: Person;

  // Form that handles editing of user description
  editAccountForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public events: Events,
    public apiProvider: ApiProvider
  ) {

    // Setup form
    this.editAccountForm = formBuilder.group({
      description: ['']
    });
  }

  ionViewDidLoad() {

    // Fetch user information and update form description value
    this.apiProvider.getUser().subscribe(
      user => {
        this.user = user;
        this.editAccountForm.controls['description'].setValue(user.description);
      }
    );
  }

  ionViewWillLeave() {

    // Update user description by calling API
    this.user.description = this.editAccountForm.controls['description'].value;
    this.apiProvider.setUserDescription(this.user.description).subscribe(

      // Fire event account-changed
      next => this.events.publish('account-changed', this.user)
    );
  }

  randomise() {
    let loading = this.loadingCtrl.create();
    loading.present();

    // Call API updateUser to randomise user image and age
    this.apiProvider.updateUser().subscribe(
      user => {
        this.user = user;
        loading.dismiss();
      }
    );
  }

}
