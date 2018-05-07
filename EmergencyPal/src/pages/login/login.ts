import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  data:any = {};

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public http: Http) {
      this.data.username = "";
      this.data.password = "";
      this.data.response = "";
      this.http = http;
  }

  register(){
      this.navCtrl.push(RegisterPage);
  }

  login(){
      var link = 'http://localhost/emergencypal/login.php';
      var newLogin = JSON.stringify({username: this.data.username, password: this.data.password});
       // console.log(newLogin);

      this.http.post(link, newLogin).subscribe(data => {
        let response = data.json();
        // this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
        console.log(response);
        if(response.status == "200"){
          this.loading();
          this.navCtrl.setRoot(TabsPage);
        } else {
          // If account not found
          let toast = this.toastCtrl.create({
            message: 'Username atau password salah',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      }, error => {
        console.log("Oooops!");
      });
  }

  emergency(){
    this.loading();
    this.navCtrl.setRoot(TabsPage);
  }

  loading(){
    let loader = this.loadingCtrl.create({
      content: "Mohon tunggu...",
      duration: 2000
    });
    loader.present();
  }
}
