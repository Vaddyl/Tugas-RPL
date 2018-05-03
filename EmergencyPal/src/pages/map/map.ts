import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

//

declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  data:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http = http;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.displayMap();
    this.getMarker();
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
      styles: myStyles
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

  addMarker(marker, map){
    for(let mark of marker){
          //console.log(mark);
          var position = new google.maps.LatLng(mark.lat, mark.lng);
          var markIt = new google.maps.Marker({
            position: position,
            map: map,
            name: mark.name
          });
          google.maps.event.addListener(markIt,'click', ((markIt)=>{
            return () => {
                console.log(markIt.name);
<<<<<<< HEAD
                //this.navCtrl.push(LokasiPage);
=======
                // not yet
                // this.navCtrl.push(LokasiPage);
>>>>>>> 9f63adcad453c20023bec04fac8bae191a7c090b
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
      console.log(response);
    }, error => {
      return "fail";
      //console.log("Oooops!");
    });
  }

}
