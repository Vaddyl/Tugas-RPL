import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  name: string;
  username: string;
  email: string;
  contact: string;

  constructor(public dataStorage: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  ionViewWillEnter() {
   this.dataStorage.getDataUser().then((data) => {
     // console.log(data);
     this.name = data.name;
     this.username = data.username;
     this.email = data.email;
     this.contact = data.contact;
   })
  }

}
