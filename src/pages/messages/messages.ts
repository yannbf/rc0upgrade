import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import {using} from 'rxjs/observable/using';
import {messageFromAttribute} from '@angular/compiler/src/i18n/shared';
import { MessageService } from '../../providers/message/message';

@Component({
  templateUrl: 'messages.html',
  
})

export class MessagesPage {
  messages = [
    {
      user: {
        name: "Woody",
        profilePicture: "img/avatar-woody.png"
      },
      message: "Hey pal",
      timestamp: new Date(),
      isSent: false
    },
    {
      user: {
        name: "Yann",
        profilePicture: "img/avatar-placeholder.png"
      },
      message: "How's goin'?",
      timestamp: new Date(),
      isSent: true
    },
    {
      user: {
        name: "Woody",
        profilePicture: "img/avatar-woody.png"
      },
      message: "There's a snake in my boot!",
      timestamp: new Date(),
      isSent: false
    },
    {
      user: {
        name: "Woody",
        profilePicture: "img/avatar-woody.png"
      },
      message: "This town ain't big enough for the two of us.",
      timestamp: new Date(),
      isSent: false
    }
  ]

  @ViewChild(Content) content: Content;

  public messageForm: any;
  chatBox: any;
  constructor(public navCtrl: NavController,  
    public formBuilder: FormBuilder, public messageService: MessageService, public params: NavParams) {
    this.messageForm = formBuilder.group({
      message: ['', Validators.required]
    });

    this.chatBox = "";
  }

  send(message) {
      if(message && message != "") {
        var chatId = this.params.data;

        //this.messageService.sendMessage(chatId, message);
        
        let messageData = { 
           user: {
              name: "Yann",
              profilePicture: "img/avatar-placeholder.png"
            },
            message: message, 
            timestamp: new Date(),
            isSent: true
        }

        this.messages.push(messageData);
          setTimeout(() => {
            this.scrollToBottom();
          }, 100);
      }
      this.chatBox = "";
  } 

  scrollToBottom() {
    this.content.scrollToBottom();
  }

}
