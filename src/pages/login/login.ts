import { AlertService } from '../../providers/alert/alert';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';

import { AuthData } from '../../providers/auth-data/auth-data';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { ResetPasswordPage } from '../reset-password/reset-password';
 
@Component({
  templateUrl: 'login.html',
  
})
export class LoginPage {

  public loginForm: any;
  public backgroundImage = "img/welcome-3.jpg";

  constructor(public navCtrl: NavController, 
    public authData: AuthData, 
    public formBuilder: FormBuilder, 
    public alertService: AlertService,
    public loadingCtrl: LoadingController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    if(!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {

      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: "Please wait..."
      });
      
      loading.present();

      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.navCtrl.setRoot(TabsPage);
      }, error => {
        loading.dismiss().then( () => {
          this.alertService.presentErrorAlert(error.message);
        });
      });
    }
  }
  
  goToSignup(){
    this.navCtrl.push(SignupPage);
  }
  
  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }
}
