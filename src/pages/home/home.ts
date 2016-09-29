import { MockService } from '../../providers/mock.service/mock.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, App, Content } from 'ionic-angular'; 
import { LoginPage } from '../login/login'; 

@Component({
  templateUrl: 'home.html',   
})

export class HomePage {
  
  @ViewChild(Content) content: Content;
  showSearchBar:boolean = false;

  slideOptions = {
    pager: false,
     autoplay: 2300,
     speed: 1000,
    loop: true,
    direction: 'horizontal'
  };
  
  categories: any[];
  
  slides = [];

  constructor(public navCtrl: NavController, public app: App, public mockService: MockService) {
    this.app = app;
    this.mockService.getSlides().then(slides => this.slides = slides);
    this.mockService.getCategoryCards().then(categories => this.categories = categories);
  }  

  scrollDown() {
    this.content.scrollTo(0, 520, 800);
  } 
}
