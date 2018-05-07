import { Component } from '@angular/core';
import { IonicPage, AlertController, ToastController, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  data: any = {};
  passCheck = false;
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public navParams: NavParams, public http: Http) {
    this.data.name = '';
    this.data.username = '';
    this.data.email = '';
    this.data.password = '';
    this.data.repassword = '';
    this.data.response = '';
    this.http = http;
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad RegisterPage');
  }

  check(){
    if(this.data.name === '' || this.data.username === '' || this.data.email === '' || this.data.password === '' || this.data.repassword === ''){
      let toast = this.toastCtrl.create({
        message: 'Harap isi seluruh data',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else if(this.data.password !== this.data.repassword) {
      let toast = this.toastCtrl.create({
        message: 'Password yang Anda masukkan berbeda',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else if(this.regexp.test(this.data.email) == false) {
      let toast = this.toastCtrl.create({
        message: 'Mohon periksa kembali email yang Anda masukkan',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else {
      this.register();
    }
  }

  register(){
    var link = 'http://localhost/emergencypal/register.php';
    var newUser = JSON.stringify({name: this.data.name, username: this.data.username, email: this.data.email, password: this.data.password})
    // console.log(newUser);
    this.http.post(link, newUser).subscribe(data => {
      this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
      // console.log(this.data.response);
      this.navCtrl.setRoot(TabsPage);
      let alert = this.alertCtrl.create({
        title: 'Hallo!',
        subTitle: 'Selamat datang di EmergencyPal',
        buttons: ['OK']
      });
      alert.present();
    }, error => {
      console.log("Oooops!");
    });
  }
}
