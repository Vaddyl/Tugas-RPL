import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommentsPage } from '../comments/comments';
import { MapPage } from '../map/map';
import { CallNumber } from '@ionic-native/call-number';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  id: number;
  name: string;
  address: string;
  contact: string;
  img: string;
  review: number;
  lat: number;
  lang: number;
  your_lat: number;
  your_lang: number;
  distance: string;
  duration: string;

  constructor(private call: CallNumber, public dataStorage: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
    this.lat = navParams.get('location_lat');
    this.lang = navParams.get('location_lang');
    this.your_lat = navParams.get('your_lat');
    this.your_lang = navParams.get('your_lang');
    this.distance = '0 km';
    this.duration = '0 mins';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  ionViewWillEnter() {
   this.dataStorage.getMap(this.id).then((data) => {
     // console.log(data);
     this.name = data.name;
     this.address = data.address;
     this.contact = data.contact;
     this.img = data.img;
     this.review = data.review;
   })

   // Testing distance
   console.log(this.your_lat, this.your_lang, this.lat, this.lang);
   var directionsService = new google.maps.DirectionsService();
   var haight = new google.maps.LatLng(this.lat, this.lang);
   var oceanBeach = new google.maps.LatLng(this.your_lat, this.your_lang);
   var request = {
       origin: haight,
       destination: oceanBeach,
       travelMode: 'DRIVING'
   };
   directionsService.route(request, (response, status) => {
     if (status == 'OK') {
       this.distance = response.routes[0].legs[0].distance.text;
       this.duration = response.routes[0].legs[0].duration.text;
     } else {
       this.distance = '0 km';
       this.duration = '0 mins';
     }
   });
   // Testing distance

  }

  async callNumber():Promise<any>{
    try{
      await this.call.callNumber(this.contact, true);
    }catch(e){
      console.error(e);
    }
  }

  goToCommentsPage() {
    this.navCtrl.push(CommentsPage, {
      id: this.id
    });
  }

}
