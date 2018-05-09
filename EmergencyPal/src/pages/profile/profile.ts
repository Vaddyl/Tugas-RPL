import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name: string;
  username: string;
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataStorage: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter() {
   this.dataStorage.getDataUser().then((data) => {
     this.name = data.name;
     this.username = data.username;
     this.email = data.email;
   })
  }

}
