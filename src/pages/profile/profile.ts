import {AlertService} from '../../providers/alert/alert';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, App } from 'ionic-angular'; 
import { AuthData } from '../../providers/auth-data/auth-data'; 
import { WelcomePage } from '../welcome/welcome';
import { Camera, OneSignal } from 'ionic-native';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'profile.html',
  
})

export class ProfilePage implements OnInit{
  profile_picture: string;
  profileRef: any;
  errorMessage: any;
  placeholder_picture: "http://api.adorable.io/avatar/200/bob";

  enableNotifications = true;
  
  language: string = "english";
  paymentMethod: string = "paypal";
  currency: string = "USD";
 
  constructor(public navCtrl: NavController, public authData: AuthData, 
    public alertService: AlertService, public toastCtrl: ToastController, 
    public app: App) {
    this.profile_picture = "";
 
  }

  ngOnInit() {

    this.profileRef = firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/profile_picture');

    this.profileRef.on('value', (snapshot) => {
      var exists = (snapshot.val() !== null);
      if(exists){
        this.profile_picture = 'data:image/jpeg;base64,' + snapshot.val();
      }
    }); 
  }

  toggleNotifications(){ 

    if(this.enableNotifications){
      OneSignal.setSubscription(true);
      this.showToast( "Notifications enabled.", "top");
    } else {
      OneSignal.setSubscription(false);
      this.showToast( "Notifications disabled.", "top");
      
    }
  }

  showToast(message: string, position: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: position
    });
    toast.present();
  }

  updateImage(value){
    this.profile_picture = 'data:image/jpeg;base64,' + value.val();
  }

  updateProfileImage(){
      let userId: string = firebase.auth().currentUser.uid;
      
      Camera.getPicture({quality: 50, allowEdit: true, cameraDirection: Camera.Direction.FRONT, destinationType: Camera.DestinationType.DATA_URL}).then((imageData) => {
          firebase.database().ref('userProfile/' + userId).update({ profile_picture : imageData});
        }, (err) => {
          console.error(err);
        });
  } 

  logOut(){
    this.alertService.presentAlertWithCallback("Are you sure?", 
      "This will log you out of this application.").then((yes) => {
        if (yes) {
          this.authData.logoutUser().then(() => {
            this.app.getRootNav().setRoot(WelcomePage);
            // this.navCtrl.setRoot(WelcomePage);
          });
        }
      });
  }
}
