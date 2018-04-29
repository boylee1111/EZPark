import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '.././signup/signup';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Global } from '../../app/global';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  user = {
    username : "",
    password : ""
  };

  homePage = HomePage;
  signupPage = SignupPage;

  constructor(public navCtrl: NavController,
              public global:Global,
              private http: HttpClient,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  gsignin() {
    console.log("Signin with google");
  }

  signin() {
    let loader = this.loadingCtrl.create({
      content: "Processing..."
    });

    loader.present();

    let link = this.global.ROOT_URL + "/user/login";

    // for sending x-www-form-urlencoded type of data
    let body = new URLSearchParams();
    body.set('username', this.user.username);
    body.set('password', this.user.password);

    // setting headers
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    this.http.post(link, body.toString(), httpOptions)
      .subscribe(resp => {
        loader.dismiss();
        console.log(resp);

        if (!resp['success']) {
          this.showAlert(resp['error']);

        } else {
          this.global.USER_NAME = this.user.username;
          this.navCtrl.push(this.homePage).then(() => {
            let from = 0;
            let to = this.navCtrl.length() - 1;
            this.navCtrl.remove(from, to - from);
          });
        }

      }, err => {
        loader.dismiss();
        this.showAlert("Oooops! an Error occurred when making the request. Please check your connection.");
      })
  }

  showAlert(content:string) {
    let alert = this.alertCtrl.create({
      title: 'Sign In Failed',
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
