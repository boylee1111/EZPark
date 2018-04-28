import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  presentSave() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      message: 'All settings are saved',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }
  presentAdd() {
    let alert = this.alertCtrl.create({
      title: 'Add location',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Work Place'
        },
        {
          name: 'Address',
          placeholder: '401 Shady Ave',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  presentAddCard() {
    let alert = this.alertCtrl.create({
      title: 'Add Card',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Card Name'
        },
        {
          name: 'Card Number',
          placeholder: '0000000000000000',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  presentDelete(item) {
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete this information?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }
}
