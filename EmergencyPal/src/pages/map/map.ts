import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { DataProvider } from '../../providers/data/data';

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
  }

  addMarker(marker, map){
    for(let mark of marker){
          var position = new google.maps.LatLng(mark.lat, mark.lng);
          if(mark.type === "hospital"){
                var markIt = new google.maps.Marker({
                  position: position,
                  map: map,
                  icon: "assets/imgs/hospital.png",
                  name: mark
                });
          } else {
                var markIt = new google.maps.Marker({
                  position: position,
                  map: map,
                  name: mark
                });
          }
          google.maps.event.addListener(markIt,'click', ((markIt)=>{
            return () => {
                console.log(markIt.name);
                // not yet
                // this.navCtrl.push(LokasiPage);
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
      // console.log(response);
    }, error => {
      return "fail";
      //console.log("Oooops!");
    });
  }

}
