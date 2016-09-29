import { MockService } from '../../providers/mock.service/mock.service';
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AlertService } from '../../providers/alert/alert';

import { VehicleDetailPage } from '../vehicle-detail/vehicle-detail';
import { Wishlist } from '../../models/wishlist';

@Component({
  templateUrl: 'wishlists.html',
  
})

export class WishlistsPage { 

  items: Wishlist[];

  constructor(public navCtrl: NavController, public alertCtrl: AlertService, 
      public app: App, public wishlistService: MockService, public alertService: AlertService) {
    wishlistService.getWishlists().then(wishlists => this.items = wishlists);
  }

  viewDetail(item: Wishlist) {
    if(!item.private){
      this.app.getRootNav().push(VehicleDetailPage, 'one');
    } else {
      this.alertService.presentAlertWithCallback("Premium content.", 
      "This wishlist is for premium users only. Would you like to become premium?").then((yes) => {
        if (yes) {
          this.alertService.presentAlert('nice','thing');
        }
      });
    }
  } 
}
