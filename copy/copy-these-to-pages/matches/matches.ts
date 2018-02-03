import { Component } from '@angular/core';
import { IonicPage, NavParams, App } from 'ionic-angular';
import { ApiProvider, Match } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

  // List of matches
  matches: Match[] = [];

  constructor(
    public apiProvider: ApiProvider,
    public app: App
  ) {

  }

  ionViewDidLoad() {

    // Fetch matches
    this.apiProvider.getMatches()
    .subscribe(matches => this.matches = matches);
  }

  getNewMatches() {

    // Filter matches that do not have started conversations
    return this.matches.filter(match => match.chat.length == 0);
  }

  goToChatPage(matchId) {
    this.app.getRootNav().push('ChatPage', {
      matchId: matchId
    });
  }

}
