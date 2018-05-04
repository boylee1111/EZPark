import { ReservationItem } from './history';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ReservePage } from '../reserve/reserve';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Global } from '../../app/global';


/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare module struct {
  export interface ReservationItem {
    reservation_id: number;
    location: string;
    reservation_date: string;
    reservation_space_hold: number;
    isCanceled: number;
  }
}

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  reservePage = ReservePage;
  listReservations: struct.ReservationItem[];

  public reservations = [
    // {
    //   id: -1,
    //   location: "Carnegie Mellon University",
    //   center: { lat: 40.44281, lng: -79.943025 },
    //   time: "Feb 28 2018, 7:43 AM",
    //   duration: 1
    // },
    // {
    //   id: -2,
    //   location: "Carnegie Library of Pittsburgh",
    //   center: { lat: 40.44281, lng: -79.943025 },
    //   time: "March 1 2018, 8:50 AM",
    //   duration: 2
    // },
    // {
    //   id: -3,
    //   location: "Walnut Street, Shady Side",
    //   center: { lat: 40.45109460901854, lng: -79.93334770202637 },
    //   time: "March 1 2018, 5:20 PM",
    //   duration: 0.5
    // },
  ];

  public completes = [
    {
      id: -4,
      location: "Walnut Street, Shady Side",
      time: "May 1 2018, 5:20 PM",
      duration: 0.5
    }
  ];

  history: string = "ongoing";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: Global,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private launchNavigator: LaunchNavigator) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    let loader = this.loadingCtrl.create({
      content: "Processing..."
    });

    loader.present();

    let link = this.global.ROOT_URL + "/reservations/list"

    // for sending x-www-form-urlencoded type of data
    let body = new URLSearchParams();
    body.set('username', this.global.USER_NAME);

    // setting headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.http.post(link, body.toString(), httpOptions)
      .subscribe(resp => {
        loader.dismiss();
        this.listReservations = resp['reservations'];

        for (let reservation of this.listReservations) {
          console.log(reservation);
          var reserveItem = {
            id: reservation.reservation_id,
            location: reservation.location,
            center: { lat: 40.45109460901854, lng: -79.93334770202637 },
            time: reservation.reservation_date,
            duration: reservation.reservation_space_hold / 60
          };
          if (reservation.isCanceled == 0) {
            this.reservations.push(reserveItem);
          } else {
            this.completes.push(reserveItem);
          }
        }
      });
  }

  presentConfirm(id) {
    console.log(id);
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
            let loader = this.loadingCtrl.create({
              content: "Processing..."
            });

            loader.present();

            let link = this.global.ROOT_URL + "/reservations/cancel?id=" + id;
            console.log(link);

            this.http.get(link)
              .subscribe(resp => {
                console.log(resp);
                loader.dismiss();
                if (!resp['success']) {
                  this.showAlert(resp['error']);
                } else {
                  for (var i = this.reservations.length - 1; i >= 0; --i) {
                    if (this.reservations[i].id == id) {
                      this.completes.push(this.reservations[i]);
                      this.reservations.splice(i, 1);
                    }
                  }
                  this.showAlert("Successfully canceled");
                }
              });
          }
        }
      ]
    });
    alert.present();
  }
  navigate(position) {
    console.log(position);
    let options: LaunchNavigatorOptions = {
      destinationName: "My Parking Spot",
      appSelection: {
        list: [
          this.launchNavigator.APP.GOOGLE_MAPS,
          this.launchNavigator.APP.APPLE_MAPS
        ]
      }
    };

    this.launchNavigator.navigate([position['lat'], position['lng']], options);
  }

  showAlert(content: string) {
    let alert = this.alertCtrl.create({
      title: 'Reservation',
      message: content,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('OK clicked');
          }
        },
      ]
    });
    alert.present();
  }
}
