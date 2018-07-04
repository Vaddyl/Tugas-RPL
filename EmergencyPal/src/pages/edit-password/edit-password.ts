import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the EditPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html',
})
export class EditPasswordPage {

  username: string;
  old_password: string;
  new_password: string;
  confirm_new_password: string;
  regexpPassword = new RegExp(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http, public dataStorage: DataProvider, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPasswordPage');
  }

  ionViewWillEnter() {
   this.dataStorage.getDataUser().then((data) => {
     this.username = data.username;
   })
  }

  changePassword() {
    if(this.new_password !== this.confirm_new_password) {
      let toast = this.toastCtrl.create({
        message: 'The password you type does not match',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else if(this.regexpPassword.test(this.new_password) == false){
      let toast = this.toastCtrl.create({
        message: 'Your password must contains at least digit, with minimum eight length',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else {
      this.sendPassword();
    }
  }

  sendPassword(){
    var link = 'http://localhost/emergencypal/edit_password.php';
    console.log(this.old_password);
    console.log(this.new_password);
    var newPassword = JSON.stringify({username: this.username, old_password: this.old_password, new_password: this.new_password})
    this.http.post(link, newPassword).subscribe(data => {
      let response = data.json(); //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
      // console.log(response);
      if(response.status == 200){
        let alert = this.alertCtrl.create({
          title: 'Password Changed',
          subTitle: 'Password succesfully changed!',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop()
      } else {
        let alert = this.alertCtrl.create({
          title: 'Wrong Old Password',
          subTitle: 'Please enter your old password correctly!',
          buttons: ['OK']
        });
        alert.present();
      }
    }, error => {
      console.log("Oooops!");
    });
  }
}
