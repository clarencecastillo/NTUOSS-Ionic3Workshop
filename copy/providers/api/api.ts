import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

const USER_STORAGE_KEY: string = 'user';
const MATCHES_STORAGE_KEY: string = 'matches';
const MATCH_CHANCE: number = 0.3;

@Injectable()
export class ApiProvider {

  // Simulates client-side cache of matches
  matches: Match[] = [];

  // List of very bad pickup lines
  // Could use external API to generate these in the future
  pickupLines: string[] = [
    "Jingle my balls and I'll promise you a White Christmas.",
    "If you were a burger at McDonalds you'd be the McGorgeous.",
    "Do you like reptiles because Iguana be with you.",
    "Are you a 'tuna sub' spelt backwards because I wanna bus a nut.",
    "Did you just butt dial because I swear that ass is calling me.",
    "Your lips look lonely. I think they would like to meet mine.",
    "Pls send bobs and vegana.", // Works all the time I swear
    "I wish I was toilet paper so I could touch your butt.",
    "You must be a parking ticket because you've got fine written all over you.",
    "Wanna grab coffee because I like you a latte.",
    "Are you related to Yoda because Yodalicious.",
    "Are you a Sea Lion because I can sea you lion in my bed later.",
    "Are you a bank loan because you got my interest.",
    "You're the only treat I want in my sack this Halloween.",
    "Are you an archeologist because I've got a large bone for you to examine.",
    "Are you square root of -1 because you can't be real.",
    "Do you want CD's and nuts? CD's nuts.",
    "Did you sit in a pile of sugar because that ass is sweet.",
    "You're not my father but I'd still call you daddy.",
    "Do you like raisins because you're raisin this dick.",
    "Are you a gorilla exhibit because I want to drop a kid in you.",
    "Are you from Holland because Amsterdamnnnnn!",
    "Do you have 11 protons because you're sodium fine.",
    "A-B-C-D-E-F-G-R-U-D-T-F with me?",
    "You can call me Nemo cause I'm never afraid to touch the butt.",
    "If I could rearrange the letters, I'd put my D-N-U.",
    "Call me leaves because you should be blowing me."
  ];


  // NOTE
  // Some functions defined could have been implemented
  // without using Observables. For the purpose of this
  // workshop, Observables were used to simulate calling
  // of real external APIs


  constructor(
    public http: Http,
    public storage: Storage
  ) {

    // Load matches from storage if any
    this.storage.get(MATCHES_STORAGE_KEY).then(matches => {
      if (matches) {
        this.matches = matches;
      }
    });
  }

  login(name: string): Observable<Person> {
    return Observable.create(observer => {

      // Fetch random person then save in storage
      this.getRandomPeople().subscribe(
        people => {

          let user = people[0];

          // Replace name with user provied name
          user.name = name;

          this.matches = [];
          this.storage.set(USER_STORAGE_KEY, user).then(() => {
            observer.next(user);
            observer.complete();
          });
        }
      );
    })
  }

  updateUser(): Observable<Person> {
    return Observable.create(observer => {

      // Fetch random person then update saved user
      this.getRandomPeople().subscribe(
        people => {
          let person = people[0];
          this.storage.get(USER_STORAGE_KEY).then(user => {

            // Only keep new age and image
            user.age = person.age;
            user.image = person.image;

            this.storage.set(USER_STORAGE_KEY, user).then(() => {
              observer.next(user);
              observer.complete();
            });
          });
        }
      )
    });
  }

  setUserDescription(description: string): Observable<{}> {

    // Fetch user, update description then save back
    return Observable.create(observer => {
      this.storage.get(USER_STORAGE_KEY).then(user => {
        user.description = description;
        this.storage.set(USER_STORAGE_KEY, user).then(() => {
          observer.next();
          observer.complete();
        });
      });
    });
  }

  getUser(): Observable<Person> {

    // Get user from storage
    // Throws error if no user is stored (not logged in)
    return Observable.create(observer => {
      this.storage.get(USER_STORAGE_KEY)
      .then(user => {
        if (user) {
          observer.next(user);
        } else {
          observer.error();
        }
        observer.complete();
      });
    });
  }

  getMatches(): Observable<Match[]> {

    // Get list of matches
    return Observable.create(observer => {
      observer.next(this.matches);
      observer.complete();
    });
  }

  sendMessage(matchId: number, message: string): Observable<{}> {
    return Observable.create(observer => {

      // Check first if there's a match
      let match = this.matches.find(match => match.id == matchId);
      if (match == undefined) {
        observer.error();
        observer.complete();
      } else {

        this.storage.get(USER_STORAGE_KEY).then(user => {

          // Add sent message to chat history
          match.chat.push({
            from: user,
            to: match.person,
            message: message
          });

          observer.next();
          observer.complete();

          // Simulate response after delay
          setTimeout(() => this.getPickupLine().subscribe(pickupLine => {

            // Add response to chat history
            match.chat.push({
              from: match.person,
              to: user,
              message: pickupLine
            });

            // Update storage
            this.storage.set(MATCHES_STORAGE_KEY, this.matches);
          }), 1000);
        });
      }
    });
  }

  getRandomPeople(count:number = 1, gender?: string): Observable<Person[]> {

    // Fetch random people from this awesome API
    return this.http.get('https://randomuser.me/api/', {
      params: {
        results: count, // Default is 1
        gender: gender // Default is nothing which means both gender
      }
    }).map(response => {
      let results = response.json().results;
      return results.map(result => {
        return {
          username: result.login.username,

          // We could generate a random number based on user age preferemce
          // Orrrr write this awesome one-liner to calulate the age given the random DOB
          age: Math.abs(new Date(Date.now() - new Date(result.dob).getTime()).getUTCFullYear() - 1970),

          name: result.name.first,
          image: result.picture.large,
          location: 'Singapore', // Default location
          description: 'Hey there!' // Default description
        };
      })
    });
  }

  rollMatch(person: Person): Observable<number> {

    // Roll to determine if there's a match
    return Observable.create(observer => {

      // Allocate matchId based on index
      let matchId = Math.random() < MATCH_CHANCE ? this.matches.length + 1 : -1;
      if (matchId > -1) {

        // Add match to front of list
        this.matches.unshift({
          id: matchId,
          person: person,
          chat: []
        });

        // Ensure that cached list is in sync with stored matches
        this.storage.set(MATCHES_STORAGE_KEY, this.matches);
      }
      observer.next(matchId);
      observer.complete();
    });
  }

  getPickupLine(): Observable<string> {

    // Get a random pickup line from the awful list above
    return Observable.create(observer => {
      observer.next(this.pickupLines[Math.floor(Math.random()*this.pickupLines.length)]);
      observer.complete();
    });
  }

  getMatch(matchId: number): Observable<Match> {

    // Get match information of match with that matchId
    return Observable.create(observer => {
      let match = this.matches.find(match => match.id == matchId);
      if (match) {
        observer.next(match);
      } else {
        observer.error();
      }
      observer.complete();
    });
  }

}

// Models

export class Person {
  username: string;
  age: number;
  name: string;
  image: string;
  location: string;
  description: string;
}

export class Match {
  id: number;
  person: Person;
  chat: Message[];
}

export class Message {
  from: Person;
  to: Person;
  message: string;
}
