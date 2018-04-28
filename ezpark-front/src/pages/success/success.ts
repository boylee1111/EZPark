import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map'
import { HistoryPage } from '../history/history'

/**
 * Generated class for the SuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {

  mapPage = MapPage;
  historyPage = HistoryPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuccessPage');
  }

  backToMap() {
    this.navCtrl.push(this.mapPage).then(() => {
      let from = 1;
      let to = this.navCtrl.length() - 1;
      this.navCtrl.remove(from, to - from);
    });
  }

  backToHistory() {
    this.navCtrl.push(this.historyPage).then(() => {
      let from = 1;
      let to = this.navCtrl.length() - 1;
      this.navCtrl.remove(from, to - from);
    });
  }
}
