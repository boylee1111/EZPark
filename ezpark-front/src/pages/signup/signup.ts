import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { Http, RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Global } from '../../app/global';
import { HomePage } from '../home/home';
import { SigninPage } from '../signin/signin'

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user = {
    username: "",
    password: "",
    email: "",
    phone: ""
  };

  homePage = HomePage;
  signinPage = SigninPage;

  constructor(public navCtrl: NavController,
              public global:Global,
              private http: HttpClient,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {

    let loader = this.loadingCtrl.create({
      content: "Processing..."
    });

    loader.present();

    let link = this.global.ROOT_URL + "/user/sign-up";

    // for sending x-www-form-urlencoded type of data
    let body = new URLSearchParams();
    body.set('username', this.user.username);
    body.set('password', this.user.password);
    body.set('email', this.user.email);
    body.set('phone', this.user.phone);

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
      title: 'Sign Up Failed',
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
