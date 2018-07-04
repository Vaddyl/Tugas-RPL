import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from '../../providers/data/data';

import { LocationPage } from '../location/location';

public declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  name: string;
  username: string;
  email: string;
  lat: number;
  lang: number;

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  data: any = {};

  constructor(public geolocation: Geolocation, public dataStorage: DataProvider, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http = http;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.getPosition();
  }

  ionViewWillEnter() {
   this.dataStorage.getDataUser().then((data) => {
     this.name = data.name;
     this.username = data.username;
     this.email = data.email;
   })
 }

 getPosition() {
   this.geolocation.getCurrentPosition()
     .then(
       (location) => {
         this.lat = location.coords.latitude,
         this.lang = location.coords.longitude,
         this.displayMap(location.coords.latitude, location.coords.longitude),
         this.getMarker()
       }
     )
     .catch(
       (location) => {
         // use dummy location
         this.lat = -6.191503,
         this.lang = 106.903563,
         this.displayMap(-6.191503, 106.903563),
         this.getMarker()
       }
     )
 }
  // Display Map function
  displayMap(lat, lang){
    var location = new google.maps.LatLng(lat, lang);
    var myStyles =[
      {
          featureType: "poi",
          elementType: "labels",
          stylers: [
                { visibility: "off" }
          ]
      }
    ];
    var options = {
      center: location,
      zoom: 15,
      streetViewControl: false,
      mapTypeId: 'roadmap',
      styles: myStyles,
      fullscreenControl: false // Kalo diklik bakalan error
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    // Location of the user
    var markIt = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: "assets/imgs/alert1.png",
    });
  }

  addMarker(marker, map){
    for(let mark of marker){
          var position = new google.maps.LatLng(mark.lat, mark.lng);
          if(mark.type === "hospital"){
                var markIt = new google.maps.Marker({
                  position: position,
                  map: map,
                  icon: "assets/imgs/hospital.png",
                  id: mark.id
                });
          } else {
                var markIt = new google.maps.Marker({
                  position: position,
                  map: map,
                  id: mark.id
                });
          }
          this.dataStorage.storeMarkerById(mark.id, mark);
          google.maps.event.addListener(markIt,'click', ((markIt)=>{
            return () => {
                this.navCtrl.push(LocationPage, {
                  id: markIt.id,
                  location_lat: mark.lat,
                  location_lang: mark.lng,
                  your_lat: this.lat,
                  your_lang: this.lang
                });
            };
          })(markIt));
    }
  }

  getMarker(){
    var link = 'http://localhost/emergencypal/map.php';
    this.http.post(link, "").subscribe(data => {
      let response = data.json();
      //this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
      //console.log(this.data.response);
      this.addMarker(response, this.map);
      //this.dataStorage.storeMarker(response);
      // console.log(response);
    }, error => {
      return "fail";
      //console.log("Oooops!");
    });
  }

}
