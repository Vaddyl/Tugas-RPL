import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { P3kPage } from '../pages/p3k/p3k';
import { StatsPage } from '../pages/stats/stats';
import { HelpPage } from '../pages/help/help';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { LocationPage } from '../pages/location/location';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { EditPasswordPage } from '../pages/edit-password/edit-password';
import { CommentsPage } from '../pages/comments/comments';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number'; // https://ionicframework.com/docs/native/call-number/
import { Geolocation } from '@ionic-native/geolocation'; // https://ionicframework.com/docs/native/geolocation/

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MapPage,
    P3kPage,
    StatsPage,
    HelpPage,
    TabsPage,
    RegisterPage,
    ProfilePage,
    AboutPage,
    LocationPage,
    EditProfilePage,
    EditPasswordPage,
    CommentsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MapPage,
    P3kPage,
    StatsPage,
    HelpPage,
    TabsPage,
    RegisterPage,
    ProfilePage,
    AboutPage,
    LocationPage,
    EditProfilePage,
    EditPasswordPage,
    CommentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    CallNumber,
    Geolocation
  ]
})
export class AppModule {}
