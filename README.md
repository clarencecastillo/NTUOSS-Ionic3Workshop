# NTUOSS Ionic 3 Workshop

*by [Clarence Castillo](https://github.com/clarencecastillo) for NTU Open Source Society*

This workshop is based on [ionic-team/ionic](https://github.com/ionic-team/ionic). Familiarity with HTML, CSS and JavaScript would be useful but not required to complete this workshop.


**Disclaimer:** *This document is only meant to serve as a reference for the attendees of the workshop. It does not cover all the concepts or implementation details discussed during the actual workshop.*
___

![banner](screenshots/banner.png?raw=true)

### Workshop Details
**When**: Wednesday, 14 Feb 2018. 6:30 PM - 8:30 PM.</br>
**Where**: LT13 Nanyang Technological University</br>
**Who**: NTU Open Source Society

### Questions
Please raise your hand any time during the workshop or email your questions to [me](mailto:hello@clarencecastillo.me) later.

### Errors
For errors, typos or suggestions, please do not hesitate to [post an issue](https://github.com/clarencecastillo/NTUOSS-Ionic3Workshop/issues/new)! Pull requests are very welcome! Thanks!
___


## Task 0 - Introduction and Setup
___

### 0.1. Introduction

In this workshop, we'll be creating a [Tinder](https://tinder.com/) clone app from scratch using [Ionic](https://ionicframework.com/) which is an open source mobile app development framework that makes it ridiculously easy to build hybrid and progressive applications using web tools you're already familiar with.

Please note that although we are trying to replicate Tinder, the main goal of this workshop is actually to get you familiar with the important concepts required to get you started with Ionic. The focus would be on the concepts behind the framework, and not so much on the syntax so there will be a lot of copy/pasting without explanatory details.

Before we start, it might be helpful to get a high-level understanding of the core concepts behind Ionic:

#### Ionic

Ionic is a front-end framework built on top of Apache Cordova which allows you to create mobile applications using just HTML, CSS and JavaScript (more on this in awhile). So if you are a web developer or if you come from a web-app development background, Ionic helps you extend that skillset into creating mobile applications.

In other words, it is just like [Bootstrap](https://getbootstrap.com/) for mobile apps which provides the building blocks and the skeleton for the front-end of your application.

#### Apache Cordova

Apache Cordova is the underlying development framework that wraps your web app as a native application targeted to each platform (iOS, Android, etc), and rely on standards-compliant API bindings to access each device's capabilities using the same programming interface - that means you don't need to know how to speak Java or Swift.

![apache cordova architecture](https://cordova.apache.org/static/img/guide/cordovaapparchitecture.png)

#### Angular

Angular is a TypeScript-based web app platform that extends HTML attributes using *directives* and dynamically binds data to HTML templates using *expressions*. With TypeScript, Angular brings true object oriented web development to the mainstream using a syntax that will make Java 8 developers feel at home.

It is important to note that Angular is not an MVC framework, but rather a component-based framework which is designed to be like a tree of loosely coupled, reusable components.

#### TypeScript

TypeScript is an open source strictly typed superset of JavaScript that compiles to plain JavaScript. Simply put, it is not any different to the same old JavaScript we're used to, but with OOP support, strong static typing and compile-time error checking through compilation. This should be easy for you to pickup if you're familiar with Java and/or JavaScript.

___

We still have much to discuss but that will have to do for now. I'll explain and describe other concepts as we go through the workshop but if you're interested to find out more, feel free to check out these links to see the bigger picture of how it all works:

[Ionic Concepts](https://ionicframework.com/docs/v1/concepts/structure.html)

[Where does the Ionic Framework fit in?](https://blog.ionicframework.com/where-does-the-ionic-framework-fit-in/)

[Apache Cordova Overview](https://cordova.apache.org/docs/en/latest/guide/overview/index.html)

Hopefully, by the end of this workshop, you'll be able to create your own mobile application using the fundamental basics that we'll be covering today.

#### 0.2. Initial Setup
1.  Download and install [Atom](https://atom.io/) together with [atom-typescript](https://atom.io/packages/atom-typescript). Essentially, you're free to use any text editor, but for this workshop, I'll be using Atom in particular so you're on your own if you're using other IDEs.
2.  Download [this project](https://github.com/clarencecastillo/NTUOSS-Ionic3Workshop/archive/master.zip) and unzip the folder to your preferred workspace.
3.  Download and install the latest LTS version of [NodeJS](https://nodejs.org/en/) for your OS.
4.  Assuming you've done step 3 correctly, you can run `npm install -g ionic cordova` to install the required npm packages.
5.  Download and install [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html).
6.  On your mobile phone, download and install [Ionic DevApp](https://ionicframework.com/docs/pro/devapp/). We'll use this to deploy the app to our devices without having to deal with platform-specific export issues.

> **Note**<br>
> 1. In step 1, please take note that you also need to install the atom-typescript's dependencies.
> 2. In step 4, the `-g` tells npm that this is a global install (not a local install), so for Windows that means you'll need to run this from an Admin command prompt and for Mac/Linux, you'll need to prepend that command with `sudo` as in `sudo npm install -g ionic cordova`.

## Task 1 - Hello Ionic
___

#### 1.1 Creating a Project

As with most frameworks out there, the first step is always to bootstrap our project using the ready-to-go boilerplates that's available for us to use. For our fake tinder app, we'll use the `tabs` boilerplate to get things started. Go ahead and run the code below:

```bash
$ ionic start not-tinder tabs
```

This tells ionic to create a new project named `not-tinder` using the `tabs` app template. Note that this also created a new folder with the given project name in whichever directory you were at when you ran the command. For your reference, check out [Starter Templates](https://ionicframework.com/docs/cli/starters.html) for the full list of templates.

If it asks if you want to integrate Cordova into our app, just hit `N` (for No) for now as this might take some time. Assuming you've done the steps correctly, you should be seeing the message as shown in the line below.

`♬ ♫ ♬ ♫  Your Ionic app is ready to go! ♬ ♫ ♬ ♫`

#### 1.2 Running Locally

Now that our project's ready, go ahead and `cd` into `not-tinder` and run the `serve` command. This should automatically open Google Chrome for us which is set to automatically refresh whenever you make changes to your app code.

```bash
$ cd ./not-tinder
$ ionic serve -w 'google chrome'
```

Alternatively, you can also run your app on an actual device or even a simulator using [Cordova](https://ionicframework.com/docs/cli/#using-cordova). This will require you to install platform specific dependencies such as Xcode or Android Studio. That will take us some time to setup so we'll have to leave that out of this workshop for now.

![welcome](screenshots/welcome.png?raw=true)

You'll notice that our application looks just like a webpage but with mobile app components -  exactly what Ionic is all about. From Google Chrome's control panel, open Chrome Developer Tools and then enable the Device Toolbar so our app looks exactly like it's running on an actual device. To make sure we're in the same page, be sure to change your device to Nexus 5X (just because it has that cool phone stencil).

![devtools](screenshots/devtools.gif?raw=true)

#### 1.3 Angular Architecture Overview

Angular applications are written by composing HTML *templates* with angular-esque markup, writing *component* classes to manage those templates, adding application logic in *providers* and boxing those components and providers in *modules*.

```
.
|__src  
|  |__app                     
|     |__app.component.ts         # bootstrap code
|     |__app.html                 # root navigation
|     |__app.module.ts            # plugins, custom modules
|     |__app.scss                 # global styling
|     |__...
|  |__assets
|     |__...                      # images, fonts, css
|  |__pages
|     |__some-page
|        |__some-page.html        # page template        
|        |__some-page.module.ts   # page module
|        |__some-page.scss        # page styling
|        |__some-page.ts          # page component
|     |__...
|  |__providers                   # we'll add this later
|     |__some-provider
|        |__some-provider.ts      # provider component
|  |__theme
|     |__variables.scss           # global variables and theming
|  |__index.html                  # entry template
|  |__...
|__...
```

As mentioned earlier, Angular is basically just a component-based framework which is designed to be like a tree of loosely coupled, reusable components. Components are linked using references in their *module* definitions. Looking at the directory structure, you'll notice that every *module* has at least one `*.module.ts` *NgModule* file, `*.html` template, `*.scss` stylesheet, and a `*.ts` class file.

If you're wondering why *providers* don't have their own module files, that's because providers are included in the top-level `app` module. That means you'll need to declare the provider in the `providers` section inside `app.module.ts` (more on this later).

#### 1.4 Data Binding

Traditionally, developers manually push data values into the HTML controls to reflect changes as the user interacts with the components. Writing this push/pull logic by hand is monotonous, error-prone and is extremely unpleasant to read.

```html
<!--html-->
<div id="content"></div>
<button onclick="myFunction()">Click me</button>
```

```js
// vanila javascript
function myFunction() {
  document.getElementById("content").innerHTML = "Hello World";
}

// jquery
function myFunction() {
  // acceptable but still prone to error if you get the ID wrong
  $('#content').html("Hello World");
}
```

With Angular **data binding**, a mechanism for coordinating parts of a template with parts of a component, you won't need to write so much code just to update the DOM element in your template. Angular processes all data bindings once per event cycle - from the root of the application tree through all child components so you don't have to worry about watching for changes manually.

```html

<!--html-->
<div>{{text}}</div>
<button (click)="text='Hello World'">Click me</button>

```

Alternatively, if your function is slightly more complex, you can define a function in your component class and just bind that function call in the `(click)` event of your button element.

```html
<!--html-->
<div>{{text}}</div>
<button (click)="myFunction()">Click me</button>
```

```ts
// typescript
myFunction() {

  // simple hello world
  let h = String.fromCharCode(104);
  let e = String.fromCharCode(101);  
  let l = String.fromCharCode(108);
  let d = String.fromCharCode(100);
  let o = String.fromCharCode(111);
  let w = String.fromCharCode(119);
  let r = String.fromCharCode(114);
  let space = String.fromCharCode(160);
  let no_space = '';
  let myArr = [d,l,r,o,w,space,o,l,l,e,h];
  let myArrNow = myArr.reverse();
  let string = myArrNow.join(no_space);
  let stringArray = string.split(space);

  // update value of text
  this.text = stringArray.shift() + space + stringArray.shift();
}
```

Now that I've convinved you (I hope), let's try changing the content of our `home` component to `Hello Ionic`. Go ahead and open `./src/pages/home/home.html` and change the content of the `<h2>` tag to `{{text}}`. Note the `{{text}}` syntax is an *interpolation* that displays the component's `text` property value within the `<h2>` element.


```html
...
<ion-content padding>
  <!-- change to this -->
  <h2>{{text}}</h2>
  <p>
    This starter project comes with simple tabs-based layout for apps
    that are going to primarily use a Tabbed UI.
  </p>
  ...
</ion-content>
```

You'll notice that your browser automatically refreshes when you hit save. Of course you won't see anything there yet as we haven't initialised the value of `text` from inside our component. To do this, open `./src/pages/home/home.ts` and add the line `text: string = "Hello Ionic";` inside the `HomePage` class right before the constructor. The file should look something like this assuming you've done that correctly.

```ts
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // add this line
  text: string = "Hello Ionic";

  constructor(public navCtrl: NavController) {

  }

}
```

As mentioned earlier, TypeScript is strongly typed so it is possible (though not required) to declare your variables with the intended type. This gives atom the permission to slap you in the face if you ever assign `text` with a value other than a `string`.

## Task 2 - Dependencies
___

Moving on to the next step, we'll be setting up the dependencies and perform all the preparation we need for our app. From this section onwards, I will be discussing feature-specific concepts as we go along the development of the app so you get to follow exactly how to implement them. For now, go ahead and kill your server using `Ctrl+C`.

#### 2.1 Color Themes

Ionic uses [Sass](http://sass-lang.com/) as an extension of CSS to style its component templates. It's much like CSS (it is CSS) except that it adds variables, nested rules, mixins, inline imports and etc.

Let's define our app's color variables which we'll be using everywhere in our application. To do this, open `.src/theme/variables.scss` scroll all the way to the `Named Color Variables` section. You'll see that there is already a pre-defined variable so all we have to do is replace this with our own. Replace the entire `$colors` object with the following:

```scss
$colors: (
  primary:    #ef8428,
  secondary:  #f7b733,
  tertiary:   #fc4a1a,
  light:      #e6e6e6,
  background: #f5f7fa,
  dim:        #c3c8d0,
  dark:       #222222
);
```

The syntax to reference the `primary` color in our theme is `color($colors, primary)`. Notice that you can basically create other variables and all you have to do is replace `$colors` with that variable name.

#### 2.2 Custom CSS and Fonts

Although Ionic already comes with a pretty neat collection of [components](https://ionicframework.com/docs/components/), specialised requirements such as that of the application we're building requires custom libraries that extend the functionalities of our app.

Since Ionic is a web framework, we can utilise existing libraries built for the web such as animation packages, utilities and etc. For this step, we'll be installing [Animate.css](https://daneden.github.io/animate.css/) for transitional animations and [SpinKit](http://tobiasahlin.com/spinkit/) for the loading animations. We'll also be using non-standard fonts [Chalet New York 1980](http://freakfonts.com/fonts/chalet-newyorknineteeneighty-font-download.html) for the famous *Tinder* logo and [Hipster Script Pro](https://www.sudtipos.com/font/hipster-script) for the iconic *"It's a Match"* page.

From this repository, copy and paste the folders `css` and `fonts` to your own `src/assets` directory. Once you've done that, we need to tell Ionic where these files are so we can use them in our development. To do this, add the following lines to the end of `.src/theme/variables.scss`. Note that the font declarations should immediately (but need not) follow the `Fonts` section of that file just for organisation.

```scss
// For app logo
@font-face {
  font-family: "Chalet";
  src: url($font-path + "/ChaletNewYorkNineteenEighty.ttf") format("ttf");
}

// For "It's a Match"
@font-face {
  font-family: "Hipster Script Pro";
  src: url($font-path + "/Hipster Script Pro.otf") format("otf");
}

// Animations
// --------------------------------------------------

// Transitional animations
@import "../assets/css/animate.css";

// Loading animations
@import "../assets/css/spinkit.css";
```

#### 2.3 Plugins

Node Package Manager or [NPM](https://www.npmjs.com/) for short is a command-line tool used to install and manage JavaScript packages. It comes pre-installed with Node.js so you don't have to do anything to get it running.

To recreate Tinder successfully, we obviously need to implement the card swiping feature that perfectly captures, in the form of a thumb gesture, the complex human social construct: flirting. We could reinvent the wheel and create this from scratch *or* simply install [angular2-swing](https://github.com/ksachdeva/angular2-swing) which would provide us exactly what we need with very minimal integration work.

Besides that, we'll also be installing [css-animator](https://github.com/fabiandev/css-animator) to *Angularise* animation.css and [Storage](https://ionicframework.com/docs/storage/) to provide us with a local database service. From your terminal, paste and run the code below to install the packages mentioned. This command downloads the specified packages into the `node_modules` directory of your project.

```bash
$ npm install css-animator angular2-swing @ionic/storage
```

Since Storage is a global service, we'll need to import that into our root module. Modify `./src/app/app.module.ts` to reflect the following changes. Note that we're not adding the other two plugins for now as they will be manually imported to the respective pages where they're needed.

```ts
...
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  ...,
  imports: [
    ...
    IonicStorageModule.forRoot()
  ],
  ...
})
export class AppModule {}
```

> In a nutshell, the general workflow in using plugins in Ionic is to install it via NPM and then declare it in the root module or the specific module where it is being used.

## Task 3 - Backend Stuff
___

#### 3.1 Providers

By convention, components shouldn't fetch or save data directly because they are transient in nature, meaning they are bound to be destroyed along with any data you may be thinking of storing there.

To provide a layer of abstraction, we'll be creating a service so that all other components can use it. Note that I'm using the terms *provider* and *service* interchangeably because they actually mean the same thing.

Since it would probably take another entire workshop to fully explain how it works, we'll be copying over the provider I've already written and I'll be explaining the core concepts behind it. For now, go ahead and copy the folder `providers` to your own `src` directory.

Going back to our observation earlier, the provider doesn't come with an `api.module.ts` because Ionic providers, by practice, belong to the root module. That means you'll need to add `ApiProvider` to the `providers` list in the root module. And since `HttpModule` is a direct dependency of our provider, we'll need to import it to the root module. Once you've done that, the file should now look something like this:

```ts
...
import { HttpModule } from '@angular/http';
import { ApiProvider } from '../providers/api/api';

@NgModule({
  ...,
  imports: [
    ...,
    HttpModule
  ],
  ...,
  providers: [
    ...,
    ApiProvider
  ]
})
export class AppModule {}

```

#### 3.2 Asynchronous Programming

When dealing with UI or any application that interfaces with a server, it is almost inevitable that some parts of your code have to be written in an asynchronous fashion. Obviously you don't want your app to *hang* while it waits for an external resource and so in this endeavour, Angular utilises RxJS's `Observable` module to work with asynchronous data streams.

To illustrate, let's take a closer look at the `getRandomPeople()` method inside the newly added `ApiProvider`. Note that this entire function returns an `Observable` which expects a stream of `Person[]` data as indicated by the return type in the signature.

```ts
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
```

Whenever we call this this method, an `http` request is fired asynchronously so you're free to do other things while the request is doing its job. Here's how a call to this function would typically look like from inside a component class.

```ts
people: Person[];

...

getPeople(count: number) {
  let loading = this.loadingCtrl.create();
  loading.present();
  this.apiProvider.getRandomPeople(count).subscribe(
    people => {
      this.people = people;
      loading.dismiss();
    }
  );
}
```

## Task 4 - Not Tinder
___

![storyboard](screenshots/storyboard.png?raw=true)

So for the rest of the workshop, we'll be working on the actual pages that will be used in our app. If you've noticed, those pages in pink tone already exist in our current project so we'll just have to modify those a bit. For the orange ones, we'll be creating them from scratch and as for those that are green, we'll just have to copy and paste them as the fundamental concepts behind those pages would have already been covered by those we'll be modifying/creating.

#### 4.1 Ionicons

Let's start by modifying the `TabsPage` template to reflect the correct pages we will be using based on the storyboard above. Taking a closer look at `tabs.html`, you'll notice that we can actually specify which icon to use for our tabs. Lucky for us, we don't have to install a third-party icons library like [Font Awesome](https://fontawesome.com/) because Ionic already comes with its own icon library: [Ionicons](https://ionicframework.com/docs/ionicons/).

Replace the entire content of `src/pages/tabs/tabs.html` with the following lines. Observe that we're taking out the `tabTitle` attribute because we don't really need that and that we're also changing the icons to appropriately represent `AccountPage`, `ExplorePage` and `MatchesPage` respectively.

```html
<ion-tabs tabsPlacement='top' selectedIndex="1">
  <ion-tab [root]="tab1Root" tabIcon="md-contact"></ion-tab>
  <ion-tab [root]="tab2Root" tabIcon="md-flame"></ion-tab>
  <ion-tab [root]="tab3Root" tabIcon="md-chatbubbles"></ion-tab>
</ion-tabs>
```

Just to quickly explain, the `tabsPlacement='top'` attribute lets us specify which part of the window we want the tabs to be positioned. The default differs according to the platform target so we're basically overriding that by explicitly telling the template renderer that we want it at the `top`. The `selectedIndex="1"` attribute tells our Navigation Controller (more on this later) to set the initial tab index to be displayed as `1` meaning the `tab2Root` tab.

#### 4.2 Lazy Loading

Generally, the term *lazy loading* refers to the programming design pattern which defers initialisation of an object until the point at which it is needed. This greatly contributes to the efficiency in the program's operation specifically because it defers loading of modules later only when the user traverses that page.

Unlike those pages we'll be creating later, the `tabs` template does not include this feature out of the box so we'll need to add it in manually. Let's fix that by modifying the `TabsPage` and `HomePage` components. First, we'll modify the component class files, perform a clean up of other outdated quirks in the boilerplate and finally create the missing module file for our components. Open `src/pages/tabs/tabs.ts` and perform the following modifications below.

```ts
// remove import AboutPage, ContactPage and HomePage
// import IonicPage
import { IonicPage } from "ionic-angular";    
import { Component } from '@angular/core';

@IonicPage()                    // add IonicPage decorator to lazy load the page
@Component({
  selector: 'page-tabs',        // specify selector tag for styling
  templateUrl: 'tabs.html'
})
export class TabsPage {

  // Tabs pages
  tab1Root = 'AccountPage';     // change tab root pages according to storyboard
  tab2Root = 'ExplorePage';     // note that these are strings
  tab3Root = 'MatchesPage';

  constructor() { }
}
```

Since the boilerplate did not come with a stylesheet for us to style `TabsPage`, go ahead and create a file `tabs.scss` in the `src/pages/tabs` directory. Paste the following code as the content of the new file you just created. Observe that all *sass* files linked with a specific component always have that component's selector as the top-level container.

```scss
page-tabs {
  .tabbar {
    background: white !important;

    .tab-button-icon {
      color: color($colors, dim);
      font-size: 3.2rem;
    }
  }
}
```

Do the same for `HomePage`'s class file `src/pages/home/home.ts`. You'll notice that there is already a selector in the component declaration because the page already came with a `home.scss` stylesheet when the project was created.

```ts
...
// import IonicPage
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()                    // add IonicPage decorator to lazy load the page
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
...
}

```

Finally, add the module declaration files for both pages. Copy the files `home.module.ts` and `tabs.module.ts` to their respective page directories.

You'll notice that once you go *lazy*, you'll be referencing pages as strings as opposed to actual identifiers. Ionic circumvents the default *eager loading* pattern by Angular by using some kind of magic trick they've written in the `IonicPage` decorator which is something not so important to know right now.

To keep it consistent, we'll need to take out the existing references in our `src/app/app.module.ts`. Not only because of that but also because it doesn't make sense for these pages to be there as it goes against the notion that every page should be encapsulated by its own module. Go ahead and delete the unused page references in `src/app/app.module.ts`.

```ts
// remove page imports
...

@NgModule({
  declarations: [
    MyApp
    // remove page declarations
  ],
  ...
  entryComponents: [
    MyApp
    // remove pages from entry components
  ],
  ...
})
export class AppModule {}
```

We'll also need to modify `src/app/app.component.ts` since it still contains the imported version of `TabsPage`. We will have to set the value of `rootPage` to `LoadingPage` that's the first page our app's supposed to enter according to the storyboard.

```ts
...
// remove import TabsPage

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // change to LoadingPage
  rootPage:any = 'LoadingPage';
  ...
}
```

Also, now that we've cleaned up the boilerplate quirks, we can also delete the unused pages that came with the template. We should be able to do this safely since we've already decoupled the references to these pages. Go ahead and delete the folders `about` and `contact` from the `src/pages/` directory.

#### 4.3 Creating Pages

For the next step, we'll be creating some of the pages that will get our application's UI going. Run the following commands below from your terminal. This should prepare for you those pages according to the component specification discussed earlier.

```bash
$ ionic generate page loading
$ ionic generate page matches
$ ionic generate page login
$ ionic generate page account
$ ionic generate page explore
```

At this point, since we're now working on the visible aspect of our application, go ahead and start the server again. Don't forget to open Chrome Developer Tools and enable the Device Toolbar so you can see the phone stencil around your application window. Notice that since we've changed the `rootPage` property of our `app.component.ts`, our application now directs the user to the `LoadingPage` on startup.

![loading_a](screenshots/loading_a.png?raw=true)

#### 4.4 Navigation

One technique that developers do is to create a routing component which acts like a gateway that redirects users to the correct page according to the application's state. So if the user's logged in, we could perform some initial tasks to prepare the user's data and then redirect the navigation to the main content of our app, otherwise, we'll have to ask the user to login.

That's exactly what our `LoadingPage` is for except that we don't really have much initial preparation to do so we'll have to throw in a timeout delay to simulate that. Let's write the logic behind our `LoadingPage` component. Edit the contents of `src/pages/loading/loading.ts` with the modifications below:

```ts
...
// remove import of NavParams
import { IonicPage, NavController } from 'ionic-angular';
// add import ApiProvider
import { ApiProvider } from "../../providers/api/api";

...
export class LoadingPage {

  constructor(
    // remove injection of NavParams
    public navCtrl: NavController,
    // inject ApiProvider
    public apiProvider: ApiProvider
  ) {

  }

  // replace ionViewDidLoad with this method
  ionViewDidEnter() {

    // Add delay to show loading animation
    setTimeout(() => {

      // Go to TabsPage if user is logged in otherwise go to HomePage
      this.apiProvider.getUser().subscribe(
        user => this.navCtrl.setRoot('TabsPage', {}, {
          animate: true,
          direction: 'forward'
        }),
        error => this.navCtrl.setRoot('HomePage', {}, {
          animate: true,
          direction: 'forward'
        })
      );
    }, 500);
  }

}
```

According to the docs, `ionViewDidEnter` is a reserved method that is executed whenever the page has fully entered and is now the active page. This method is executed way more frequently than the `ionViewDidLoad` method which is only called once when the page is created. These are lifecycle events that are part of Ionic's [NavController](https://ionicframework.com/docs/api/navigation/NavController/).

Since we're working on the `LoadingPage` component, we might as well add in the template and stylesheet codes. Most of the time, there's a lot of trial and error involved when you're coding these things from scratch. Personally, I think the free-style aspect of this practice is the fun part in web development but I have to admit that it is very time consuming.

With that said, for this workshop, we won't be focusing much on the nuts and bolts of HTML and SCSS, so you can just copy and replace over `loading.html` and `loading.scss` to this component's directory.

![loading](screenshots/loading.png?raw=true)

The `HomePage` doesn't really have that much to offer other than to play the role of a landing page which would display the application's logo and login button. Go ahead and copy `home.html` and `home.scss` to the `src/pages/home` directory. You'll notice that the login button calls the method `goToLoginPage()` on click, so let's add that to our component class.

```ts
...
export class HomePage {

  // delete the Hello Ionic property if you still haven't

  constructor(
    public navCtrl: NavController
    // remove import NavParams
  ) {
  }

  // implement this method
  goToLoginPage() {
    this.navCtrl.push('LoginPage');
  }

}
```

The `NavController` is the service which controls the app's navigation. You can think of it as a stack, where you `push` new pages to it and `pop` your way back to the previous page. Notice that for `LoadingPage`, we traversed to `HomePage` using `setRoot` instead of `push` because we want this to be a one-way traversal.

#### 4.5 Animations

Let's make our `HomePage` interesting by adding an easter egg to the logo using animations. Open `src/pages/home/home.html` and insert the `bounce` animation directive to the `icon-wrapper` div as follows:

```html
<ion-content>
  ...
  <div class="logo">
    <div class="icon-wrapper" animates #animation="animates" (click)="animation.start({ type: 'bounce', pin: false, reject: false })">
      ...
    </div>
  </div>
 ...
</ion-content>
```

The directive is part of the `css-animator` plugin which makes it easy to add `animation.css` animations to our components without modifying the component's class. Note that since we don't intend to import this plugin globally, we need to import `AnimatorModule` to the `HomePage` module file `src/pages/home/home.module.ts`:

```ts
...
// add import AnimatorModule
import { AnimatorModule } from "css-animator";

@NgModule({
  ...
  imports: [
    AnimatorModule,                             // add this to the imports
    ...
  ],
})
export class HomePageModule {}
```

![animation](screenshots/animation.gif?raw=true)

#### 4.6 Forms

Let's continue building our pages. For the next step, we'll be writing the `LoginPage` which we'll use to get the user's name. For the simplicity of this workshop, we won't be tackling authentication or any complicated user management whatsoever, however you should be able to extend the concepts explained here to implement those things. Copy and replace `login.scss` and `login.ts` to the `LoginPage` component directory.

Let's modify `login.html` and `login.ts` to include our form components. Here we're utilising Angular's `FormBuilder` service which makes it easy to manage user input.

```html
<!--add no-shadow and no-border-->
<ion-header no-shadow no-border>
  <ion-navbar>
    <!--remove title-->
  </ion-navbar>
</ion-header>

<!--remove padding-->
<ion-content>
  <!--add this form-->
  <form [formGroup]="loginForm">
    <ion-item>
      <ion-input type="text" formControlName="name" placeholder="Your Name" autocorrect="off" autocapitalize="none">
      </ion-input>
    </ion-item>
    <button ion-button clear [disabled]="!loginForm.valid" (click)="login()">Log In</button>
  </form>
</ion-content>

```

```ts
...
// import FormGroup, FormBuilder and Validators
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

...
export class LoginPage {

  // declare this form
  loginForm: FormGroup;

  constructor(
    ...,
    public formBuilder: FormBuilder                 // inject FormBuilder
  ) {

    this.loginForm = this.formBuilder.group({       // initialise form
      name: ['', Validators.required]               // the form should have an input 'name' with default vaue ''
    });                                             // this field is required i.e. should not blank be to be valid
  }

  login() {

    // check first if the form is valid
    if (this.loginForm.valid) {

      // extract the value of the control 'name' from the form
      let name = this.loginForm.controls['name'].value;

      this.apiProvider.login(name).subscribe(
        ...
      );
    }
  }

}
```

To explain, the `[formGroup]="loginForm"` attribute lets our template renderer know that this `form` is linked to the `loginForm` of our component class and `[disabled]="!loginForm.valid"` is used to disable the submit button until the form becomes valid. The `formControlName` maps the specific input to the corresponding control in the `loginForm`.

![login](screenshots/login.png?raw=true)

## Task 5 - Wrapping Up
___

Good on you for making it this far! We've actually covered just enough so you can get started with developing a complete mobile application.  We'll just need to integrate the other parts, and then after that we'll use Ionic DevApp to deploy it to our device.

Go ahead and copy the pages `account`, `chat`, `edit-account`, `explore`, `match`, `matches`, `profile` and `settings` to the `src/pages` folder. Note that you'll need to overwrite the contents of the folders `account`, `explore` and `matches`. Also, you may need to kill and re-run the serve command right after moving those files in.

![this workshop in a nutshell](https://img.memecdn.com/how-to-draw-face_o_178517.jpg)

#### 5.1 Deployment

For quick testing, it's actually very simple to deploy your app to your mobile device. All you need to do is open your iOS or Android device and connect to the same network as your computer (through wifi). Open the DevApp and you should be able to see your `not-tinder` show up on the list. If for some reason you can't see it, NTUSECURE is probably the culprit. Try using your phone to create a hotspot and then change your laptop's network to that. You should be able to see the app from then

___

## Just The Tip of The Iceberg

If you're looking for an overview of what else is included with Ionic, you should check out the [components](https://ionicframework.com/docs//components/) documentation. You'll realise that if you just stick with standard UI, you'll spend less time writing code and more on reading documentation.

There's still an entire world for you to explore but for now I recommend you start with the [docs](https://ionicframework.com/docs/). Hopefully reading that would be a breeze now that we've covered most if not all of the important stuff you need to become a mobile app developer.

___

## Acknowledgements

Many thanks to [anqitu](https://github.com/anqitu) for carefully testing this walkthrough and to everybody else in [NTU Open Source Society](https://github.com/ntuoss) committee for making this happen! :kissing_heart::kissing_heart::kissing_heart:
