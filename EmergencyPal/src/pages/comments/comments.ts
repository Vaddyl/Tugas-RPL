import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  //dummy
  comments = [
    { author: 'Andi', content: 'Kacau nih rumah sakit jir.' },
    { author: 'Budi', content: 'Tukang parkirnya galak.' },
    { author: 'Uvuvvuweuweweuweuweu Ogwerlmwefl Ossas', content: 'AweueuwueuweuwueuwwueeuwAweueuwueuweuwueuwwueeuwAweueuwueuweuwueuwwueeuwAweueuwueuweuwueuwwueeuwAweueuwueuweuwueuwwueeuw' }
  ];
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataStorage: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

  ionViewWillEnter() {
    this.dataStorage.getDataUser().then((data) => {
      // console.log(data);
      this.name = data.name;
    })
   }

}
