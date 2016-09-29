import { MockService }    from '../../providers/mock.service/mock.service';
import { AlertService }   from '../../providers/alert/alert';
import { Component }      from '@angular/core';
import { NavController, NavParams }  from 'ionic-angular';
 
@Component({
  templateUrl: 'vehicle-detail.html',
  
})
export class VehicleDetailPage {
  
  vehiclePictures = [
    'img/plane-1.jpg',
    'img/plane-2.jpg'
  ];
  
  slideOptions = {
    loop: true,
    pager: true
  };

  public journey: any;
  
  constructor(public navCtrl: NavController, public alertService: AlertService, 
    public params: NavParams, public journeyService: MockService) {
    let id = params.data.journeyId;
    journeyService.getJourneyById(id).then( journey => {
//      this.journey = journey
    });
  }

  bookVehicle(){
    let title = "Are you sure?";
    let message = "This will rent the vehicle, there is no turning back.";
    this.alertService.presentAlertWithCallback(title, message).then((yes) => {
      if(yes) { 
        this.alertService.presentAlert("Thank you!", "A confirmation will be sent to you shortly.");
      }
    })
  }
}
