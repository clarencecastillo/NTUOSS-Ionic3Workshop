import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Person, ApiProvider, Message, Match } from "../../providers/api/api";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  // User information
  // Used to identify if message was sent or received
  user: Person;

  // Match information
  // Contains messages
  match: Match;

  // Form that handles sending of messages
  chatForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    public formBuilder: FormBuilder
  ) {

    // Fetch match information using matchId
    let matchId = navParams.get('matchId');
    apiProvider.getMatch(matchId).subscribe(
      match => this.match = match
    );

    // Fetch user information
    apiProvider.getUser().subscribe(
      user => this.user = user
    );

    // Setup form
    this.chatForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
  }

  private scrollToBottom() {

    // Scroll to the bottom of the chat list
    let messageListElement = document.getElementById('message-list');
    messageListElement.scrollTo({
      top: messageListElement.scrollHeight
    });
  }

  sendMessage() {
    if (this.chatForm.valid) {
      let message = this.chatForm.controls['message'].value;
      this.apiProvider.sendMessage(this.match.id, message).subscribe(
        next => {

          // Clear input field
          this.chatForm.controls['message'].setValue('');

          // Scroll once after 100ms to show sent message
          setTimeout(() => this.scrollToBottom(), 100);

          // Scroll again after 1200ms to show response
          setTimeout(() => this.scrollToBottom(), 1200);
        }
      )
    }
  }

  ionViewDidLoad() {

    // Wait for messages to render before scrolling
    setTimeout(() => this.scrollToBottom(), 100);
  }

  onMessageInputFocus() {

    // Wait for keyboard to move the list before scrolling
    setTimeout(() => this.scrollToBottom(), 100);
  }

}
