import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-p3k',
  templateUrl: 'p3k.html',
})
export class P3kPage {

  constructor(public dataStorage: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad P3kPage');
    this.dataStorage.getMap(2).then((data) => {
      console.log(data);
    })
  }

}
