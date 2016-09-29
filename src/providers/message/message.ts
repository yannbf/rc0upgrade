import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

@Injectable()
export class MessageService {

  constructor(public http: Http) { }
 

  retrieveNewMessagesCount() {
    var ref = firebase.database().ref('chats');
    return new Observable(observer => {
          ref.on('value', (snapshot) => { 
              observer.next(snapshot.numChildren());	
          },
          (error) => {
              console.log('ERROR', error);
              observer.error(error);		
          });	
      });
  }
 
  retrieveChatsByMember(){
    var ref = firebase.database().ref('conversations');
    var mQuery = ref
    .child("one")
    .child("members")
    .orderByChild("yann")
    .equalTo(true);
        return new Observable(observer => {
            var query = mQuery.on('value', (snapshot) => {
                var arr = [];

                snapshot.forEach(function (childSnapshot):any{
                    var data = childSnapshot.val();
                    data = data.filter((item) => item.hugo).map((item) => item.id);
                    data['id'] = childSnapshot.key;

                    console.log(data);
                    arr.push(data);			
                });
                observer.next(arr);		
            },
            (error) => {
                console.log('ERROR', error);
                observer.error(error);		
            });	
        });

  }

  retrieveChats() {
        var ref = firebase.database().ref('chats');

        return new Observable(observer => {
            var query = ref.orderByChild("timestamp");
            query.on('value', (snapshot) => {
                var arr = [];

                snapshot.forEach(function (childSnapshot):any{
                    var data = childSnapshot.val();
                    data['id'] = childSnapshot.key;
                    arr.push(data);			
                });
                observer.next(arr);		
            },
            (error) => {
                console.log('ERROR', error);
                observer.error(error);		
            });	
        });
    }

    retrieveMessages(id: any) {
        var ref = firebase.database().ref('messages/' + id);

        return new Observable(observer => {
            ref.on('value', 
                (snapshot) => {
                    var arr = [];

                    snapshot.forEach( function (childSnapshot) :any{
                        var data = childSnapshot.val();
                        data['id'] = childSnapshot.key;
                        arr.push(data);
                    });
                    observer.next(arr);
                },
                (error) => {
                    console.log('Error:', error);
                    observer.error(error);
                });
        });
    }

    sendMessage(chatId, message){
        var session = JSON.parse(window.localStorage['session'] || '{}');

        var postData = {
            message: message,
            name: "testy",
            timestamp: new Date()
        };

        var newMessageKey = firebase.database().ref().child('messages').push().key;
        var updates = {};
        updates['/messages/' +chatId + '/' + newMessageKey] = postData;

        return firebase.database().ref().update(updates);
    }

    sendMessages(uid, username, picture, title, body) {
        // A post entry.
        var postData = {
            author: username,
            uid: uid,
            body: body,
            title: title,
            starCount: 0,
            authorPic: picture
        };

        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        return firebase.database().ref().update(updates);
        }


    // sendMessage(chatId, message){
    //     var session = JSON.parse(window.localStorage['session'] || '{}');

    //     var postData = {
    //         message: message,
    //         name: session.username,
    //         timestamp: new Date()
    //     };

    //     var messageId = firebase.database().ref().child('messages/' + chatId).push().key;

    //     var updates = {};
    //     updates['/messages/' + chatId + '/' + messageId] = postData;

    //     return firebase.database().ref().update(updates);
    // }
}

