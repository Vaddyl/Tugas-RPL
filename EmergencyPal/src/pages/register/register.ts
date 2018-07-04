import { Component } from '@angular/core';
import { IonicPage, AlertController, ToastController, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  data: any = {};
  passCheck = false;
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  regexPhone = new RegExp(/^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g);
  regexpPassword = new RegExp(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public navParams: NavParams, public http: Http) {
    this.data.name = '';
    this.data.username = '';
    this.data.email = '';
    this.data.password = '';
    this.data.repassword = '';
    this.data.response = '';
    this.data.phone = '';
    this.http = http;
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad RegisterPage');
  }

  check(){
    if(this.data.name === '' || this.data.username === '' || this.data.email === '' || this.data.password === '' || this.data.repassword === '' || this.data.phone === ''){
      let toast = this.toastCtrl.create({
        message: 'Please fill all the data field',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else if(this.data.password !== this.data.repassword) {
      let toast = this.toastCtrl.create({
        message: 'The password you type does not match',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else if(this.regexp.test(this.data.email) == false) {
      let toast = this.toastCtrl.create({
        message: 'Please check your email address',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else if(this.regexpPassword.test(this.data.password) == false) {
      let toast = this.toastCtrl.create({
        message: 'Your password must contains at least digit, with minimum eight length',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else if(this.regexPhone.test(this.data.phone) == false || this.data.phone == "") {
      let toast = this.toastCtrl.create({
        message: 'Input valid phone number!',
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
    var newUser = JSON.stringify({name: this.data.name, username: this.data.username, email: this.data.email, phone: this.data.phone, password: this.data.password})
    // console.log(newUser);
    this.http.post(link, newUser).subscribe(data => {
      let response = data.json(); //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
      // console.log(response);
      if(response.status == 409){
        let alert = this.alertCtrl.create({
          title: 'Email or Username already taken',
          subTitle: 'Please use different email or username',
          buttons: ['OK']
        });
        alert.present();
      } else {
        this.navCtrl.setRoot(LoginPage);
        let alert = this.alertCtrl.create({
          title: 'Account Created',
          subTitle: 'Your account has been created successfully!',
          buttons: ['OK']
        });
        alert.present();
      }
    }, error => {
      console.log("Oooops!");
    });
  }

  popThis(){
    this.navCtrl.pop();
  }
}
