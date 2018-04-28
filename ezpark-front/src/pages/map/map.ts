import { Component, ViewChild, ElementRef} from '@angular/core';
import { PopoverController, IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
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

  parkMap = {
    CMU: {
      location: "Carnegine Mellon University, 5000 Forbes Ave",
      center: {lat: 40.44281, lng: -79.943025},
      avalibility: 32,
      radius: 3
    },

    Lib: {
      location: "Carnvegie Library of Pittsburgh",
      center: {lat: 40.44283191510726, lng: -79.95044946670532},
      avalibility: 51,
      radius: 1.5
    },

    Shady: {
      location: "Walnut St, Pittsburgh",
      center: {lat: 40.45109460901854, lng: -79.93334770202637},
      avalibility: 45,
      radius: 2
    },

    Park: {
      location: "Schenley Park",
      center: {lat: 40.434862188806825, lng: -79.94248867034912},
      avalibility: 78,
      radius: 4
    }
  }



  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              private geolocation:Geolocation,
              public loadingCtrl:LoadingController) {
  }


  ionViewDidLoad() {

    let loader = this.loadingCtrl.create({
      content: "Loading map..."
    });

    loader.present();

    this.initMap();
    this.loadCircle();

    loader.dismiss();

    //this.geolocation.getCurrentPosition()
    //  .then((position) => {
    //    loader.dismiss();
    //    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //    this.map.setCenter(latLng);
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
      //styles: [
      //  {
      //    "elementType": "geometry",
      //    "stylers": [
      //      {
      //        "color": "#fcf6ec"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "administrative",
      //    "elementType": "geometry.stroke",
      //    "stylers": [
      //      {
      //        "color": "#c9b2a6"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "administrative.land_parcel",
      //    "elementType": "geometry.stroke",
      //    "stylers": [
      //      {
      //        "color": "#dcd2be"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "administrative.land_parcel",
      //    "elementType": "labels.text.fill",
      //    "stylers": [
      //      {
      //        "color": "#ae9e90"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "landscape.natural",
      //    "elementType": "geometry",
      //    "stylers": [
      //      {
      //        "color": "#dbeccc"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "poi",
      //    "elementType": "geometry",
      //    "stylers": [
      //      {
      //        "color": "#fbeed7"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "poi",
      //    "elementType": "labels.text.fill",
      //    "stylers": [
      //      {
      //        "color": "#93817c"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "poi.park",
      //    "elementType": "geometry.fill",
      //    "stylers": [
      //      {
      //        "color": "#b8e39c"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "poi.park",
      //    "elementType": "labels.text.fill",
      //    "stylers": [
      //      {
      //        "color": "#447530"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "road",
      //    "elementType": "geometry",
      //    "stylers": [
      //      {
      //        "color": "#f5f1e6"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "road.arterial",
      //    "elementType": "geometry",
      //    "stylers": [
      //      {
      //        "color": "#ffffff"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "road.arterial",
      //    "elementType": "geometry.stroke",
      //    "stylers": [
      //      {
      //        "color": "#ffffff"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "road.highway",
      //    "elementType": "geometry",
      //    "stylers": [
      //      {
      //        "color": "#ffe56c"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "road.highway",
      //    "elementType": "geometry.stroke",
      //    "stylers": [
      //      {
      //        "color": "#e6b437"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "road.highway.controlled_access",
      //    "elementType": "geometry",
      //    "stylers": [
      //      {
      //        "color": "#faa786"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "road.local",
      //    "elementType": "geometry",
      //    "stylers": [
      //      {
      //        "color": "#dfd7cd"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "road.local",
      //    "elementType": "labels.text.fill",
      //    "stylers": [
      //      {
      //        "color": "#806b63"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "transit.line",
      //    "elementType": "geometry",
      //    "stylers": [
      //      {
      //        "color": "#dfd2ae"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "transit.line",
      //    "elementType": "labels.text.fill",
      //    "stylers": [
      //      {
      //        "color": "#8f7d77"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "transit.station",
      //    "elementType": "geometry",
      //    "stylers": [
      //      {
      //        "color": "#f8c3a6"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "water",
      //    "elementType": "geometry.fill",
      //    "stylers": [
      //      {
      //        "color": "#a3dfed"
      //      }
      //    ]
      //  },
      //  {
      //    "featureType": "water",
      //    "elementType": "labels.text.fill",
      //    "stylers": [
      //      {
      //        "color": "#92998d"
      //      }
      //    ]
      //  }
      //]
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }


  loadCircle() {

    for (let park in this.parkMap) {
      // Add the circle for this city to the map.

      let circleColor = this.parkMap[park].avalibility >= 50 ? "#2AC1E4" : "#F7896E";

      let circle = new google.maps.Circle({
        strokeWeight: 0,
        fillColor: circleColor,
        fillOpacity: 0.35,
        map: this.map,
        center: this.parkMap[park].center,
        radius: this.parkMap[park].radius * 80
      });

      new google.maps.Circle({
        strokeWeight: 0,
        fillColor: circleColor,
        fillOpacity: 0.35,
        map: this.map,
        center: this.parkMap[park].center,
        radius: this.parkMap[park].radius * 50
      });

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.parkMap[park].center,
        color: circleColor,
        label: {
          text: "" +  this.parkMap[park].avalibility,
          color: "white"
        }
      });

      let content = "<div class='map-window'><p>"+ this.parkMap[park].location + "</p><p>Price: $5</p> <button class='reserve-button'>Reserve Now, " + this.parkMap[park].avalibility + " Available</button></div>";

      this.addInfoWindow(marker, content, park);
    }
  }


  addInfoWindow(marker, content, park) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListenerOnce(infoWindow, 'domready', (e) => {
      document.getElementsByClassName('reserve-button')[0].addEventListener('click', () => {
        this.navCtrl.push(this.reservePage);
      });
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
