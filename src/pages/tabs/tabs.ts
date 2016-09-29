import { Component, OnInit } from '@angular/core';
import { HomePage } from '../home/home';
import { WishlistsPage } from '../wishlists/wishlists';
import { ChatsPage } from '../chats/chats';
import { ProfilePage } from '../profile/profile';
import { ExplorePage } from '../explore/explore';

import { MessageService } from '../../providers/message/message';

@Component({
  templateUrl: 'tabs.html',
  
})
export class TabsPage implements OnInit {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab4Root: any;
  public tab5Root: any;

  public newMessages: number;

  constructor(public messageService: MessageService) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = WishlistsPage;
    this.tab3Root = ExplorePage;
    this.tab4Root = ChatsPage;
    this.tab5Root = ProfilePage;

  }

  ngOnInit(){ 
    this.messageService.retrieveNewMessagesCount()
      .subscribe((data: any) => {
        console.log(data);
        this.newMessages = data;
      });
  }
}
