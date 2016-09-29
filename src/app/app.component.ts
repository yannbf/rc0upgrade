import {window} from 'rxjs/operator/window';
import { Component, OnInit } from '@angular/core';
// import {provide} from '@angular/core';
// import {Http, HTTP_PROVIDERS} from '@angular/http';

// import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { Platform} from 'ionic-angular';
import { StatusBar, Splashscreen, OneSignal} from 'ionic-native';

// import * as firebase from 'firebase';


@Component({
  template: '<ion-nav swipeBackEnabled="true" [root]="rootPage"></ion-nav>'
})

export class MyApp implements OnInit{

  public rootPage: any;
  public local: any;

  constructor(private platform: Platform, private  translate: TranslateService) { 
    this.local = new Storage(LocalStorage); 
    this.rootPage = WelcomePage;
    // TODO: uncomment when in production
    // this.local.get('introShown').then((result) => {
    //     if(result){
    //         this.rootPage = TabsPage;
    //     } else {
    //         this.local.set('introShown', true);
    //         this.rootPage = WelcomePage;
    //     }
    // });
    if (platform.is('cordova')) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 300);
    }

    this.translateConfig();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      if (platform.is('cordova')) {
        this.registerDeviceForNotifications();
      }
    });
  }

  ngOnInit(){
    this.initFirebaseConfig();
    this.checkLoggedUser();
  }

  initFirebaseConfig() {
    var config = {
      apiKey: "AIzaSyCvdOUR6-XK97DP0m67gxxB7y6BuYMm-h8",
      authDomain: "ionicbootcamp.firebaseapp.com",
      databaseURL: "https://ionicbootcamp.firebaseio.com",
      storageBucket: "ionicbootcamp.appspot.com",
      messagingSenderId: "852970232235"
    };

    firebase.initializeApp(config);
  }

  registerDeviceForNotifications(){
    OneSignal.init('b8fb69c3-d08d-41ee-86ae-619392abc761',
                       {autoRegister: true, googleProjectNumber: '306849192367'})
        .subscribe(jsonData => {
          console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
        });

    OneSignal.enableInAppAlertNotification(true);
  }

  checkLoggedUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.local.set('user', user);
        // If there's a user take him to the home page.
        this.rootPage = TabsPage;
      } else {
        // If there's no user logged in send him to the LoginPage
        this.rootPage = WelcomePage;
      }
    });
  }

  translateConfig() {
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(en|pt-br)/gi.test(userLang) ? userLang : 'pt-br';
 
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
 
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(userLang);
  }
}
 
ionicBootstrap(MyApp, [[provide(TranslateLoader, {
  useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
    deps: [Http]
  }),
  TranslateService], AlertService], {}
);