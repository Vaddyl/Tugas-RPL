import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommentsPage } from '../comments/comments';
import { CallNumber } from '@ionic-native/call-number';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  id: number;
  name: string;
  address: string;
  contact: string;
  img: string;
  review: number;

  constructor(private call: CallNumber, public dataStorage: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    // console.log(this.id);
  }

  ionViewWillEnter() {
   this.dataStorage.getMap(this.id).then((data) => {
     // console.log(data);
     this.name = data.name;
     this.address = data.address;
     this.contact = data.contact;
     this.img = data.img;
     this.review = data.review;
   })
  }

  async callNumber():Promise<any>{
    try{
      await this.call.callNumber(this.contact, true);
    }catch(e){
      console.error(e);
    }
  }

  goToCommentsPage() {
    this.navCtrl.push(CommentsPage, {
      id: this.id
    });
  }

}
