import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { SuccessPage } from '../success/success'

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

  successPage = SuccessPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservePage');
  }

  processOrder() {
    let loader = this.loadingCtrl.create({
      content: "Processing..."
    });

    loader.present();
    setTimeout(() => {
      loader.dismiss();
      this.navCtrl.push(this.successPage);
    }, 2000)

  }
}
