import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Plugins } from '@capacitor/core';
const  { Browser } = Plugins;

import { ModalController } from '@ionic/angular';
import { TipsPage } from './tips/tips.page';

import { GeneralService } from './general-service/general.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  private customerMode = false;
  customerview:boolean;
  employeeview:boolean;

  public appPages = [
    { title: 'Dashboard',       url: '/dashboard',      icon: 'home' },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController:ModalController,
    public general:GeneralService) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.general.changeMode(this.customerMode);
    this.general.customerMode$.subscribe(res => {
      this.customerMode = res; this.general.customerMode = res;
      (this.customerMode) ? this.appPages.push({ title:'My Requests', url:'/maintenance-req', icon: 'hammer' }) : this.appPages.pop();
      (this.general.customerMode) ? this.customerview = true : this.employeeview = true;
    });
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: TipsPage
    });
    return await modal.present();
  }
  async openBrowser() {
    await Browser.open({ url: 'https://amalooloo.shop' });
  }
  logOut() {
    window.localStorage.removeItem('KEY_email');
  }


}
