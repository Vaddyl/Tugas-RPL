import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  data:any = {};

  //dummy
  comments = [];
  name: string;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public dataStorage: DataProvider, public http: Http) {
      this.data.comment = "";
      this.data.post_id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
    this.getComment();
  }

  ionViewWillEnter() {
    this.dataStorage.getDataUser().then((data) => {
      // console.log(data);
      this.data.name = data.name;
      this.data.user_id = data.user_id;
    })
   }

   postcomment(){
     var link = 'http://localhost/emergencypal/comment.php';
     var data = JSON.stringify({user_id: this.data.user_id, name: this.data.name, post_id: this.data.post_id, comment: this.data.comment});
    // console.log(data);
     this.http.post(link, data).subscribe(data => {
       this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
       // console.log(this.data.response);
       //this.navCtrl.setRoot(LoginPage);
       let alert = this.alertCtrl.create({
         title: 'Posted!!',
         subTitle: 'Your post cool!',
         buttons: ['OK']
       });
       alert.present();
       this.getComment();
     }, error => {
       console.log("Oooops!");
     });
   }

   getComment(){
     var link = 'http://localhost/emergencypal/get_comment.php';
     var data = JSON.stringify({post_id: this.data.post_id});
     this.http.post(link, data).subscribe(data => {
       let response = data.json();
       //this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
       console.log(data.json());
       this.comments = data.json();
       //this.dataStorage.storeMarker(response);
       // console.log(response);
     }, error => {
       return "fail";
       //console.log("Oooops!");
     });
   }

}
