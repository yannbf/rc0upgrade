import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { NavController, LoadingController } from 'ionic-angular';

import { AlertService } from '../../providers/alert/alert';
import { AuthData } from '../../providers/auth-data/auth-data';

import { LoginPage } from '../login/login';
 
@Component({
  templateUrl: 'reset-password.html',
  
})

export class ResetPasswordPage {
  public resetPasswordForm: any;

  constructor(public navCtrl: NavController,public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertService: AlertService) {
    
    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.required]
    });
  }

  resetPassword(){

    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } else {
      this.authData.resetPassword(this.resetPasswordForm.value.email).then((user) => {
        this.alertService.presentAlert("Success", 
        "We just sent you a reset link to your email").then(() => {
                this.navCtrl.pop();
        });
      }, (error) => {
        this.alertService.presentErrorAlert(error.message).then(() => {
                this.navCtrl.pop();
        });
      });
    }
  }
}
