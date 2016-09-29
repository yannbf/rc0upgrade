import { MockService } from '../../providers/mock.service/mock.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  templateUrl: 'explore.html',
  
})
export class ExplorePage {
  categories: any[];
  constructor(public navCtrl: NavController, public categoryService: MockService) {
    categoryService.getCategoryCards().then(categories => this.categories = categories);
  }

}
