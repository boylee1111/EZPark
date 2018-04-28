import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { SuccessPage } from '../success/success'

/**
 * Generated class for the QuickRevPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quick-rev',
  templateUrl: 'quick-rev.html',
})
export class QuickRevPage {

  reserveTime = {
    month: '2018-02-28',
    timeStarts: '07:43',
    duration: 0.5
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
