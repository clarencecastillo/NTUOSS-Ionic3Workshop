import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  // Form that handles the settings
  settingsForm: FormGroup;

  // Holds the double-range data
  // Cannot use form control because expected model is an object
  age = {
    lower: 18, // Default minimum age
    upper: 34 // Default maximum age
  }

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public storage: Storage,
    public events: Events
  ) {

    // Setup form
    this.settingsForm = this.formBuilder.group({

      // Default setting to show men
      showMen: [true],

      // Default setting to show women
      showWomen: [true],

      // Default distance
      maxDistance: [80, [Validators.min(2), Validators.max(161)]],

      // See default age defined above
      minAge: [this.age.lower, [Validators.min(18), Validators.max(55)]],
      maxAge: [this.age.upper, [Validators.min(18), Validators.max(55)]]
    });
  }

  ionViewDidLoad() {

    // Fetch previous settings if any
    this.storage.get('settings').then(settings => {
      if (settings) {
        this.settingsForm.setValue(settings);
      }
    });
  }

  ionViewWillLeave() {

    // Save to storage when leaving the page
    // Fire settings-changed event
    this.storage.set('settings', this.settingsForm.value).then(() =>
    this.events.publish('settings-changed'));
  }

  logout() {

    // Go to loading page then clear all storage data
    this.navCtrl.setRoot('LoadingPage').then(() => this.storage.clear());
  }

  onGenderToggleChange(key) {

    // Parameter key is used to determine which gender was toggled
    // Need to ensure that at least one gender preference is set to true
    if (!this.settingsForm.controls[key].value) {
      let otherKey = {
        'showMen': 'showWomen',
        'showWomen': 'showMen'
      }[key];

      // If this changed the key to false, ensure that the other key is true
      if (!this.settingsForm.controls[otherKey].value) {
        this.settingsForm.controls[otherKey].setValue(true);
      }
    }
  }

}
