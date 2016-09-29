import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular'; 
import { FormBuilder, Validators, ControlGroup } from '@angular/common';

import { AlertService } from '../../providers/alert/alert';
import { AuthData } from '../../providers/auth-data/auth-data';
import { TabsPage } from '../tabs/tabs';

@Component({
  templateUrl: 'signup.html',
  
})

export class SignupPage {
  signupForm: any;
  transferDate : string;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertService: AlertService,
    public authData: AuthData, public formBuilder: FormBuilder) {
      this.signupForm = formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      }); 
  }

  signupUser(){

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      
      this.authData.signupUser(this.signupForm.value.email, 
      this.signupForm.value.password,  this.signupForm.value.name).then(() => {
        this.navCtrl.setRoot(TabsPage);
      }, (error) => {
        this.alertService.presentErrorAlert(error.message); 
      });

      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });

      loading.present();
    }
  }
  
  ionViewLoaded(){
    this.todayDate(this.transferDate);
  }

  todayDate(datetoDay :string) :void{
    let utc = new Date().toJSON().slice(0,10);
    if (datetoDay === undefined ){
      this.transferDate = utc;
    }
  }
}
