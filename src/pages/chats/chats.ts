import { Component, OnInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { MessagesPage } from '../messages/messages';

import { MessageService } from '../../providers/message/message';

@Component({
  templateUrl: 'chats.html',
  
})

export class ChatsPage implements OnInit{
 
  chats: any;

  constructor(public navCtrl: NavController, public app: App, public messageService: MessageService) {
  }

  viewMessages(chat){ 
    this.app.getRootNav().push(MessagesPage, {chatId: chat.id});
  }

  ngOnInit(){
    this.messageService.retrieveChats()
      .subscribe((data: Array<any>) => {
        console.log(data);
        this.chats = data;
      });
  }

  retrieveChats(){
    this.messageService.retrieveChats()
      .subscribe((data: Array<any>) => {
        console.log(data);
        this.chats = data;
      });
  }
}
