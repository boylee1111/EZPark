import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { ReservePage } from '../reserve/reserve';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  reservePage = ReservePage;

  public reservations = [
  {
    location: "Carnegie Mellon University",
    time: "Feb 28 2018, 7:43 AM",
    duration: 1
  },
  {
    location: "Carnegie Library of Pittsburgh",
    time: "March 1 2018, 8:50 AM",
    duration: 2
  },
  {
    location: "Walnut Street, Shady Side",
    time: "March 1 2018, 5:20 PM",
    duration: 0.5
  },
];

  public completes = [
    {
      location: "Walnut Street, Shady Side",
      time: "March 1 2018, 5:20 PM",
      duration: 0.5
    }
  ];

  history: string = "ongoing";

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Cancel reservation',
      message: 'Do you want to cancel the reservation?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
