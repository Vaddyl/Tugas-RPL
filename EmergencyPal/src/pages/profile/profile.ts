import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { EditPasswordPage } from '../edit-password/edit-password';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name: string;
  username: string;
  email: string;
  contact: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataStorage: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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

  editProfile(){
    this.navCtrl.push(EditProfilePage);
  }

  editPassword(){
    this.navCtrl.push(EditPasswordPage);
  }

}
