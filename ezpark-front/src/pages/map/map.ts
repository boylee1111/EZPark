import { Component, ViewChild, ElementRef} from '@angular/core';
import { PopoverController, IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Global } from '../../app/global';
import { Geolocation } from '@ionic-native/geolocation';
import { ReservePage } from '../reserve/reserve';
import { SettingsPage } from '../settings/settings'

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

declare module struct {
  export interface Spot {
    price_per_hour: number;
    available_spots: number;
    x: number;
    y: number;
    location: string;
    radius: number;
  }
}

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',

})

export class MapPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  reservePage = ReservePage;
  settingPage = SettingsPage;
  spots: struct.Spot[];

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              private geolocation:Geolocation,
              public loadingCtrl:LoadingController,
              private http: HttpClient,
              private global:Global) {
  }

  ionViewDidLoad() {

    let loader = this.loadingCtrl.create({
      content: "Loading map..."
    });

    loader.present();
    this.initMap();

    let link = this.global.ROOT_URL + "/spots/list";

    this.http.get(link)
      .subscribe((resp: struct.Spot[])=> {
        this.spots = resp['spots'];
        this.loadCircle();
        loader.dismiss();
      });

    //this.geolocation.getCurrentPosition()
    //  .then((position) => {
    //    loader.dismiss();
    //    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //    this.map.setCenter(latLng);
    //
    //    new google.maps.Marker({
    //      position: latLng,
    //      map: map,
    //      icon: im
    //    });
    //
    //  }, (err) => {
    //    loader.dismiss();
    //    console.log(err);
    //  });
  }

  initMap() {

    let latLng = new google.maps.LatLng(40.44281, -79.943025);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      clickableIcons: false,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }


  loadCircle() {

    for (let park of this.spots) {
      // Add the circle for this city to the map.

      let circleColor = park.available_spots >= 50 ? "#2AC1E4" : "#F7896E";
      let center = {lat: park.x, lng: park.y};

      let circle = new google.maps.Circle({
        strokeWeight: 0,
        fillColor: circleColor,
        fillOpacity: 0.35,
        map: this.map,
        center: center,
        radius: park.radius * 80
      });

      new google.maps.Circle({
        strokeWeight: 0,
        fillColor: circleColor,
        fillOpacity: 0.35,
        map: this.map,
        center: center,
        radius: park.radius * 50
      });

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: center,
        color: circleColor,
        label: {
          text: "" +  park.available_spots,
          color: "white"
        }
      });

      let content = "<div class='map-window'><p>" + park.location + "</p><p>Price: $" + park.price_per_hour +
        "</p> <button class='reserve-button' data-location='" +
        park.location +"'data-price="+ park.price_per_hour +">Reserve Now, " + park.available_spots +
        " Available</button></div>";

      this.addInfoWindow(marker, content, park);
    }
  }


  addInfoWindow(marker, content, park) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListenerOnce(infoWindow, 'domready', (e) => {
      document.getElementsByClassName('reserve-button')[0].addEventListener('click', (e: Event) => {

        console.log("reserve: " + e.target['dataset'].location);

        this.navCtrl.push(this.reservePage, {
          location: e.target['dataset'].location,
          price: e.target['dataset'].price
        });
      });
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
