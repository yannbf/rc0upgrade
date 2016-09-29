import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthData {

  public fireAuth: any;
  public userProfile: any;
  
  constructor() {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  loginUser(email: string, password: string): any{
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string, name: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      return this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
        this.userProfile.child(authenticatedUser.uid).set({
          email: email,
          name: name
        });
      });
    });
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.fireAuth.signOut();
  } 

  signInWithFacebook(): any{
    var provider = new firebase.auth.FacebookAuthProvider();
    this.fireAuth.signInWithPopup(provider).then((authenticatedUser) => {
        console.log(authenticatedUser);
    });
  }

  signInWithGoogle(): any{
 
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    var that = this;
    this.fireAuth.signInWithPopup(provider).then((result) => {

        if(result){
          console.log(result);
          var user = result.user;
          var res = result.user.displayName.split(" ");

          that.userProfile.child(user.uid).set({
            email: user.email,
            photo: user.photoURL,
            username: user.displayName,
            name: {
              first: res[0],
              middle: res[1],
              last: res[2]
            }
          });
        }
    }, (error) => {
      console.log(error);
    });
  }
}

