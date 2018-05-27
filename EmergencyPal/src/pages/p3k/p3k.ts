import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-p3k',
  templateUrl: 'p3k.html',
})
export class P3kPage {

  post: any;
  items: any;

  constructor(public http: Http, public dataStorage: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad P3kPage');
    this.getPost();
  }

  getPost(){
    var link = 'http://localhost/emergencypal/post.php';
    this.http.post(link, "").subscribe(data => {
      let response = data.json();
      //this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
      //console.log(this.data.response);
      console.log(response.data);
      this.post = response.data;
      this.initializeItems();
    }, error => {
      return "fail";
      //console.log("Oooops!");
    });
  }

  initializeItems() {
    this.items = this.post;
  }

  openUrl(url){
    window.open(url, '_system');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
