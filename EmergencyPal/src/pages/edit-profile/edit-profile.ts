import { Component } from '@angular/core';
import { IonicPage, AlertController, ToastController, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  name: string;
  contact: string;
  username: string;
  regexPhone = new RegExp(/^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g);

  constructor(public dataStorage: DataProvider, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  ionViewWillEnter() {
   this.dataStorage.getDataUser().then((data) => {
     // console.log(data);
     this.username = data.username;
     this.name = data.name;
     this.contact = data.contact;
   })
  }

  simpanProfil() {
    // console.log(this.contact);
    if(this.regexPhone.test(this.contact) == false) {
      let toast = this.toastCtrl.create({
        message: 'Input valid phone number!',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else {
      this.sendNewData();
    }
  }

  sendNewData() {
    var link = 'http://localhost/emergencypal/edit_profile.php';
    var newData = JSON.stringify({username: this.username, name: this.name, phone: this.contact}) // Expand? ayyy
    console.log(newData);
    this.http.post(link, newData).subscribe(data => {
      console.log(data);
      let response = data.json();
      if(response.status == 200){
        let alert = this.alertCtrl.create({
          title: 'Profile Updated',
          subTitle: 'Your profile have been updated',
          buttons: ['OK']
        });
        alert.present();
      }
    }, error => {
      console.log("Oooops!");
    });
  }

}
