import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  information: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    let localData = this.http.get('assets/information.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    });
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open; 
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

}
