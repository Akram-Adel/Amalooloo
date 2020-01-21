import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TipsPage } from '../tips/tips.page';
import { GeneralService } from "../general-service/general.service";
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications,Browser,LocalNotifications } = Plugins;
import { Storage } from '@ionic/storage';
import { FCM } from "capacitor-fcm";
const fcm = new FCM();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  customerview:boolean;
  employeeview:boolean;
  notificationcount:number = 0;
  notifications = [];

  constructor(
    private modalController:ModalController,
    private service:GeneralService,
    private storage: Storage) { }

  ngOnInit() {

    
    // this.registerPushNotification();

    //Now gets called manually in the menu
    // setTimeout(() => {
    //   this.presentModal();
    // }, 1000);
    this.preloadnotifications();

    (this.service.customerMode) ? this.customerview = true : this.employeeview = true;
    console.log('CustomerView:',this.customerview);
    console.log('EmployeeView:',this.employeeview);

  }


  registerPushNotification() {
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    fcm
    .getToken()
    .then(r => {
      
      console.log(`console.log('Push registration success, token:  ${r.token}`);
    
    })
    .catch(err => console.log(err));

    // On success, we should be able to receive notifications
    // PushNotifications.addListener('registration',
    //   (token: PushNotificationToken) => {
    //     console.log('Push registration success, token: ' + token.value);
    //     //Add in update here TODO
    //   }
    // );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {

        // LocalNotifications.schedule({
        //   notifications: [
        //     {
        //       title: "Title",
        //       body: "Body",
        //       id: 1,
        //       schedule: { at: new Date(Date.now() + 1000 * 5) },
        //       sound: null,
        //       attachments: null,
        //       actionTypeId: "",
        //       extra: null
        //     }
        //   ]
        // });



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

  async preloadnotifications (){

    console.log(this.service.userObject);
    

    this.service.getAllNotifications().subscribe((res:any) =>this.notifications = res.result );

    this.service.notifications = this.notifications;

    this.notifications.forEach(element => {
     this.notificationcount ++;

     if(element.read_at != null){


      LocalNotifications.schedule({
        notifications: [
          {
            title: "New Notification",
            body: element.message,
            id: Math.floor(Math.random() * 99999),
            schedule: { at: new Date(Date.now() + 2000 * 5) },
            sound: null,
            attachments: null,
            actionTypeId: "",
            extra: null
          }
        ]
      });

     }
     

    });
 
    




  }

  async openBrowser() {
    await Browser.open({ url: 'https://amalooloo.shop' });
  }

}
