import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map'
import { ReservePage } from '../pages/reserve/reserve'
import { SuccessPage } from '../pages/success/success'
import { HistoryPage } from '../pages/history/history'
import { SettingsPage } from '../pages/settings/settings'
import { QuickRevPage } from '../pages/quick-rev/quick-rev';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ReservePage,
    SuccessPage,
    HistoryPage,
    SettingsPage,
    QuickRevPage
  ],
  imports: [
    BrowserModule,
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
    QuickRevPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
