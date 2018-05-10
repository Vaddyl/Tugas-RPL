import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DataProvider } from '../providers/data/data';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  name: string;
  username: string;
  email: string;

  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  pages: Array<{title: string, component: any}>;

  constructor(public app: App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuController, public dataStorage: DataProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  this.dataStorage.isLogin().then((value)=>{
    //console.log(value);
      if(value){
        this.dataStorage.getRole().then((value)=>{
          console.log(value);
          switch(value){
            case "user":
              this.dataStorage.getDataUser().then((data) => {
                this.name = data.name;
                this.username = data.username;
                this.email = data.email;
              })
              this.rootPage = TabsPage;
              break;
            default : this.rootPage = LoginPage;
              break;
          }
        })
      } else {
         this.rootPage = LoginPage;
      }
  });

  this.pages = [
      { title: 'Profile', component: ProfilePage },
      { title: 'About', component: AboutPage }
    ];
  }

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component);
  }

  logout() {
    this.menu.close();
    this.dataStorage.logout();
    this.name = "";
    this.app.getRootNav().setRoot(MyApp);
  }
}
