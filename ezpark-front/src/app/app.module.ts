import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map'
import { ReservePage } from '../pages/reserve/reserve'
import { SuccessPage } from '../pages/success/success'
import { HistoryPage } from '../pages/history/history'
import { SettingsPage } from '../pages/settings/settings'
import { QuickRevPage } from '../pages/quick-rev/quick-rev';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage }  from '../pages/signin/signin';
import { Global } from './global';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ReservePage,
    SuccessPage,
    HistoryPage,
    SettingsPage,
    QuickRevPage,
    SignupPage,
    SigninPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ReservePage,
    SuccessPage,
    HistoryPage,
    SettingsPage,
    QuickRevPage,
    SignupPage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GooglePlus,
    Global,
    HTTP,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
