import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { MyApp } from '../../app/app.component';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  data:any = {};

  constructor(public app: App, public navCtrl: NavController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public http: Http, public dataStorage: DataProvider) {
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
        if(response.status == "200"){
          // console.log(response.data);
          this.dataStorage.login(response.data, "user");
          this.loading();
          this.app.getRootNav().setRoot(MyApp);
          //this.navCtrl.setRoot(TabsPage);
        } else {
          // If account not found
          let toast = this.toastCtrl.create({
            message: 'Incorrect username or password',
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
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
  }
}
