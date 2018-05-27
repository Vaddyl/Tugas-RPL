import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public dataStorage: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    // console.log(this.id);
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
  }

}
