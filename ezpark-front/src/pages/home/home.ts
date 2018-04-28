import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map'
import { HistoryPage } from '../history/history'
import { QuickRevPage } from '../quick-rev/quick-rev';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  mapPage = MapPage;
  historyPage = HistoryPage;
  reservePage = QuickRevPage;

  constructor(public navCtrl: NavController) {

  }

}
