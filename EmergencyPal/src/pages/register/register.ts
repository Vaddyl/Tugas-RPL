import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  data:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data.name = '';
    this.data.username = '';
    this.data.email = '';
    this.data.password = '';
    // this.data.password2 = '';
    this.data.response = '';

    this.http = http;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    var link = 'http://localhost/emergencypal/register.php';
    var newUser = JSON.stringify({name: this.data.name, username: this.data.username, email: this.data.email, password: this.data.password})
    // console.log(newUser);
    this.http.post(link, newUser).subscribe(data => {
      this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
      // console.log(this.data.response);
    }, error => {
      console.log("Oooops!");
    });
  }

}
