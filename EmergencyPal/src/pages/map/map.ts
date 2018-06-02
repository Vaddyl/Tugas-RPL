import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { DataProvider } from '../../providers/data/data';

import { LocationPage } from '../location/location';

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  name: string;
  username: string;
  email: string;

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  data: any = {};

  constructor(public dataStorage: DataProvider, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http = http;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.displayMap();
    this.getMarker();
  }

  ionViewWillEnter() {
   this.dataStorage.getDataUser().then((data) => {
     this.name = data.name;
     this.username = data.username;
     this.email = data.email;
   })
 }
  // Display Map function
  displayMap(){
    // Trial location
    var location = new google.maps.LatLng(-6.191503, 106.903563);
    let geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': location}, (results, status) => {
         console.log(results[3].formatted_address); // read data from here
         console.log(status);
      });
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
                // console.log(markIt.id);
                this.navCtrl.push(LocationPage, {
                  id: markIt.id
                });
            };
          })(markIt));
          //console.log(mark.name);
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
