import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import BackgroundFetch from "cordova-plugin-background-fetch";

import { Plugins, NetworkStatus, PluginListenerHandle, } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
const { Network,Browser } = Plugins;


import { ModalController } from '@ionic/angular';
import { TipsPage } from './tips/tips.page';
import { GeneralService } from 'src/app/general-service/general.service';

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
  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toastCtrl: ToastController,
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

  async ngOnInit() {
    this.platform.ready().then(this.onDeviceReady.bind(this));
    this.general.changeMode(this.customerMode);
    this.general.customerMode$.subscribe(res => {
      this.customerMode = res; this.general.customerMode = res;
      (this.customerMode) ? this.appPages.push({ title:'My Requests', url:'/maintenance-req', icon: 'hammer' }) : this.appPages.pop();
      (this.general.customerMode) ? this.customerview = true : this.employeeview = true;
    });

    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      console.log("Network status changed", status);
      this.general.GetConnectionType();
      this.networkStatus = status;
      this.general.networkstatus = status.connected;

        let testvar:any =  this.general.getRequestDB();
        if(testvar.length < 0){
          return;
        }
        if(testvar.length > 0){
          console.log("Doing Background Sync");
          console.log(testvar);

        //Do Background Sync
        this.general.sendrequests(testvar);
        }

      this.general.networkType = status.connectionType;
      if(status.connected == false){
        this.presentToast("Your internet connection is offline.");
      }
    });

    this.networkStatus = await Network.getStatus();
    this.general.networkstatus = this.networkStatus.connected;
    if(this.networkStatus.connected == true){
      let testvar = await this.general.getRequestDB();
      if(testvar.length < 0){
        return;
      }
      if(testvar.length > 0){
        console.log("Doing Background Sync");
        console.log(testvar);

      //Do Background Sync
      this.general.sendrequests(testvar);
      }
    }
  }

  onDeviceReady() {
    // Your background-fetch handler.
    let fetchCallback = async function(taskId) {
      console.log('[js] BackgroundFetch event received: ', taskId);
      // Required: Signal completion of your task to native code
      // If you fail to do this, the OS can terminate your app
      // or assign battery-blame for consuming too much background-time
      let status = await Network.getStatus();
      if(status.connected==true){
        let testvar = await this.general.getRequestDB();
        if(testvar.length < 0){
          BackgroundFetch.finish(taskId);
        }
        if(testvar.length > 0){
          //Do Background Sync
          this.general.sendrequests(testvar).then(()=>{
            BackgroundFetch.finish(taskId);
          });
        }
      }
      if(status.connected==false){
        BackgroundFetch.finish(taskId);
      }

      //Add Sync Event here
    };

    let failureCallback = function(error) {
      console.log('- BackgroundFetch failed', error);
    };

    BackgroundFetch.configure(fetchCallback, failureCallback, {
      minimumFetchInterval: 15,
      stopOnTerminate :false,
      forceAlarmManager :true,
      requiredNetworkType:BackgroundFetch.NETWORK_TYPE_ANY
    });
  }

  async presentToast(msg) {
    let toast = await this.toastCtrl.create({ message: msg, duration: 3000, position: 'bottom' });

    toast.present();
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