import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TipsPage } from '../tips/tips.page';
import { GeneralService } from "../general-service/general.service";
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications,Browser } = Plugins;
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  customerview:boolean;
  employeeview:boolean;


  constructor(
    private modalController:ModalController,
    private service:GeneralService,
    private storage: Storage) { }

  ngOnInit() {

    // this.registerPushNotification();
    setTimeout(() => {
      this.presentModal();
    }, 1000);

    (this.service.customerMode) ? this.customerview = true : this.employeeview = true;
    console.log(this.customerview, this.employeeview);

  }


  registerPushNotification() {
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        console.log('Push registration success, token: ' + token.value);
        //Add in update here TODO
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {

        this.storage.get('notifications').then((val) => {
          let temparr = JSON.parse(val);
          temparr.push(notification);

          this.storage.set('notifications', JSON.stringify(temparr));
        });



        // Or to get a key/value pair

        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );

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

}
