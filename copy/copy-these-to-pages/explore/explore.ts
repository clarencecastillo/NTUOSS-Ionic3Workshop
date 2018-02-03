import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { StackConfig } from 'angular2-swing';
import { AnimationService, AnimationBuilder } from "css-animator";
import { ApiProvider, Person } from "../../providers/api/api";
import { Storage } from "@ionic/storage";

const PEOPLE_PER_REQUEST: number = 12;

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {

  // User information
  // Used to display user image when loading
  user: Person;

  // List of people to be swiped
  people: Person[] = [];

  // Stack configuration
  stackConfig: StackConfig;

  // Controls the display of loading animation
  loading: boolean = false;

  // Used to restrict user from spamming
  isAnimating: boolean = false;

  // Declare animators for similar elements
  buttonAnimator: AnimationBuilder;
  cardAnimator: AnimationBuilder;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public animationSvc: AnimationService,
    public modalCtrl: ModalController,
    public events: Events,
    public apiProvider: ApiProvider,
    public storage: Storage
  ) {

    // Update user object if user changed image or name
    this.events.subscribe('account-changed',
    user => this.user = user);

    // Replace people stack if settings changed
    // In case user did changes in gender preference
    this.events.subscribe('settings-changed', () => {
      this.people = [];
      this.addNewPeople(PEOPLE_PER_REQUEST);
    });

    // Initialise animators
    this.buttonAnimator = animationSvc.builder().setOptions({
      reject: false
    });
    this.cardAnimator = animationSvc.builder().setOptions({
      reject: false,
      duration: 500
    });

    // Set card stack configuration
    // See https://github.com/ksachdeva/angular2-swing
    // See https://github.com/gajus/swing
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) =>
      this.getThrowConfidence(offsetX, offsetY, element),
      transform: (element, x, y, r) =>
      this.onItemMove(element, x, y, r),
      throwOutDistance: d => 600
    };

  }

  ionViewDidLoad() {

    // Fetch user information
    this.apiProvider.getUser().subscribe(
      user => this.user = user
    );

    // Add delay before fetching people just to show cool animation
    setTimeout(() => this.addNewPeople(PEOPLE_PER_REQUEST), 1000);
  }

  private getThrowConfidence(offsetX, offsetY, element) {

    // Calculate the confidence [0.0, 1.0] which direction the user will throw the card
    let xConfidence = Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
    let yConfidence = Math.min(Math.abs(offsetY) / (element.offsetHeight/2), 1);

    // Cancel the throw if there is animation running elsewhere
    // Provides buffer time to avoid spamming
    return this.isAnimating ? 0 : Math.max(xConfidence, yConfidence);
  }

  private onItemMove(element, x, y, r) {

    // Calculate the confidence [0.0, 1.0] which specific direction the user will throw the card
    let throwConfidence = {
      'super-like': Math.min((y > 0 ? 0 : Math.abs(y)) / (element.offsetHeight/2), 1),
      'dislike': Math.min((x < 0 ? Math.abs(x) : 0) / (element.offsetWidth/2), 1),
      'like': Math.min((x < 0 ? 0 : Math.abs(x)) / (element.offsetWidth/2), 1)
    };

    // Get the key with the highest throw confidence
    let likelyThrow = Object.keys(throwConfidence).reduce((a, b) =>
      throwConfidence[a] > throwConfidence[b] ? a : b);

    // Set the label opacity according to that confidence
    for (let key in throwConfidence) {
      element.getElementsByClassName(key).item(0).style['opacity'] = likelyThrow != key ? 0 : throwConfidence[key];
    }

    // Move the card along with the user's touch
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  private addNewPeople(count: number) {
    this.loading = true;

    // Get settings from storage to check for gender preference
    this.storage.get('settings').then(settings => {

      // Callback function on API response
      const handleResponse = people => {
        this.loading = false;
        this.isAnimating = false;
        this.people = this.people.concat(people);
      };

      // Fetch people according to gender preference
      if (settings && !(settings['showMen'] && settings['showWomen'])) {
        let gender = settings['showMen'] ? 'male' : 'female';
        this.apiProvider.getRandomPeople(count, gender).subscribe(
          people => handleResponse(people)
        );
      } else {
        this.apiProvider.getRandomPeople(count).subscribe(
          people => handleResponse(people)
        );
      }
    })
  }

  private throwPerson(action) {

    // Get the person being thrown
    let topCardPerson: Person = this.people[this.people.length - 1];

    // HTML element of the thrown card
    let personCard = document.getElementById(topCardPerson.username + '-card');

    // Animate throw if person was thrown using button
    if (!personCard.style.transform || personCard.style.transform == 'translate3d(0px, 0px, 0px) translate(0px, 0px) rotate(0deg)') {

      // Set action label opacity to 1
      (personCard.getElementsByClassName(action).item(0) as HTMLElement).style['opacity'] = '1';

      // Hide card using animation according to action
      this.cardAnimator.setType({
        'like': 'rotateOutUpRight',
        'dislike': 'rotateOutUpLeft',
        'super-like': 'bounceOutUp'
      }[action]).hide(personCard).then(() => {

        // Remove that person from the list
        this.people.pop();

        // Add new people if there are no more cards
        if (this.people.length == 0) {
          this.addNewPeople(PEOPLE_PER_REQUEST);
        }
      });

    } else {

      // Remove that person from the list
      this.people.pop();

      // Add new people if there are no more cards
      if (this.people.length == 0) {
        this.addNewPeople(PEOPLE_PER_REQUEST);
      }
    }
    return topCardPerson;
  }

  private animateButton(id, inAnimation, outAnimation, duration): Promise<any> {
    // Animate button on swipe or click
    // Defined as function just because it was quite complex and repetitive
    return new Promise(resolve => {
      let button = document.getElementById(id);
      this.isAnimating = true;
      this.buttonAnimator.setType(outAnimation).setDuration(duration/2).hide(button).then(() =>
      this.buttonAnimator.setType(inAnimation).setDuration(duration/2).show(button).then(() => {
        this.isAnimating = false;
        resolve();
      }));
    });
  }

  private checkMatch(person) {

    // Check API if love is in the air
    this.apiProvider.rollMatch(person).subscribe(
      matchId => {
        if (matchId > -1) {

          // Present MatchPage as modal if match is found
          this.modalCtrl.create('MatchPage', {
            person: person,
            matchId: matchId
          }, {
            enableBackdropDismiss: false
          }).present();
        }
      }
    );
  }

  like() {
    if (!this.isAnimating) {
      // Throw person, animate button then check if they are DTF
      let person = this.throwPerson('like');
      this.animateButton('like-button', 'zoomIn', 'zoomOut', 500);
      this.checkMatch(person);
    }
  }

  dislike() {
    if (!this.isAnimating) {
      // Throw person and animate button
      let person = this.throwPerson('dislike');
      this.animateButton('dislike-button', 'zoomIn', 'zoomOut', 500);
    }
  }

  superLike() {
    if (!this.isAnimating) {
      // Throw person, animate button then check if they are DTF
      let person = this.throwPerson('super-like');
      this.animateButton('super-like-button', 'jackInTheBox', 'bounceOut', 1400);
      this.checkMatch(person);
    }
  }

  goToProfilePage(person) {

    // Present ProfilePage as modal if user clicks on card image
    let profilePageModal = this.modalCtrl.create('ProfilePage', { person: person });

    // Relay action performed from modal if any
    profilePageModal.onDidDismiss(data => {
      let action = data.action;
      if (action) {
        this[{
          'like': 'like',
          'dislike': 'dislike',
          'super-like': 'superLike'
        }[action]]();
      }
    });


    profilePageModal.present();
  }
}
