import { Http, RequestOptions } from '@angular/http';
import { Global } from './../../app/global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SuccessPage } from '../success/success'
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the ReservePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reserve',
  templateUrl: 'reserve.html',
})

export class ReservePage {

  reserveTime = {
    month: '2018-02-28',
    timeStarts: '07:43',
    duration: 1.5
  };

  price = 0.0;

  successPage = SuccessPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: Global,
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');

    this.price = (this.navParams.get('price') == undefined ? 3.0 : this.navParams.get('price'));
    var forReserveDate = new Date();
    forReserveDate.setTime(forReserveDate.getTime() + (30 * 60 * 1000));

    var year = forReserveDate.getFullYear()
    var month = forReserveDate.getMonth() + 1;
    var monthStr = String(month);
    if (month < 10) {
      monthStr = '0' + month;
    }

    var day = forReserveDate.getDate();
    var dayStr = String(day);
    if (day < 10) {
      dayStr = '0' + day;
    }

    var hour = forReserveDate.getHours();
    var hourStr = String(hour);
    if (hour < 10) {
      hourStr = '0' + hour;
    }
    var min = forReserveDate.getMinutes();
    var minStr = String(min);
    if (min < 10) {
      minStr = '0' + min;
    }

    this.reserveTime.month = year + '-' + monthStr + '-' + dayStr;
    this.reserveTime.timeStarts = hourStr + ':' + minStr;
    this.reserveTime.duration = 1.0;
  }

  processOrder() {
    let loader = this.loadingCtrl.create({
      content: "Processing..."
    });

    loader.present();

    let link = this.global.ROOT_URL + "/reservations/create";

    let body = new URLSearchParams();
    body.set('username', this.global.USER_NAME);
    body.set('location', this.navParams.get('location'));
    body.set('reservation_date', this.reserveTime.month.replace('-', '/') + ' ' + this.reserveTime.timeStarts);
    body.set('reservations_space_hold', String(this.reserveTime.duration * 60))

    // setting headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.http.post(link, body.toString(), httpOptions)
      .subscribe(resp => {
        loader.dismiss();
        console.log(resp);

        if (!resp['success']) {
          this.showAlert(resp['error']);
        } else {
          this.navCtrl.push(this.successPage);
        }
      }, err => {
        loader.dismiss();
        this.showAlert("Oooops! an Error occurred when making the request. Please check your connection.");
      });
  }

  showAlert(content: string) {
    let alert = this.alertCtrl.create({
      title: 'Reserve Failed',
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
