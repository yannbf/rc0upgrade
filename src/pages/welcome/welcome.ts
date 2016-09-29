import { AlertService } from '../../providers/alert/alert';
import { Component }      from '@angular/core';
import { NavController }  from 'ionic-angular';
import { TranslatePipe }  from "ng2-translate/ng2-translate";
import { TabsPage }       from '../tabs/tabs';
import { SignupPage }       from '../signup/signup';
import { LoginPage }       from '../login/login';
import { WELCOME_SLIDES } from '../../mock/welcome-slides';


@Component({
  templateUrl: 'welcome.html',
  pipes: [ TranslatePipe ]
})
export class WelcomePage {
  slideOptions = {
    pager: true
  }; 
  slides = WELCOME_SLIDES;

  constructor(public navCtrl: NavController) { 
  }

  goToHome(){
    this.navCtrl.push(TabsPage);
  }
  
  goToSignUp(){
    this.navCtrl.push(SignupPage);
  }
  
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
}
