import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Logout } from '../pages/logout/logout';
import { About } from '../pages/about/about';
import { FavoritesPage } from '../pages/favorites/favorites';
import { Settings  } from '../pages/settings/settings';

import firebase from "firebase";

const config = {
	apiKey: "AIzaSyCNKhjF3t3mKyUdJrkkeYEaS0LHzDyGhwM",
	authDomain: "app-1-69678.firebaseapp.com",
	databaseURL: "https://app-1-69678.firebaseio.com",
	projectId: "app-1-69678",
	storageBucket: "app-1-69678.appspot.com",
	messagingSenderId: "314801221841"
};

firebase.initializeApp(config);

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  
  zone: NgZone;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
    { title: 'Home', component: HomePage },
    { title: 'Favorites',component: FavoritesPage },
    { title: 'Settings', component: Settings },
    { title: 'About', component: About },
    { title: 'Log out', component: Logout },
    ];
    console.log("2");
    this.zone = new NgZone({});
    firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = Login;
        } else { 
          this.rootPage = HomePage; 
        }
      });     
    });
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();


    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
