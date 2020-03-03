import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TipsPage } from '../tips/tips.page';
import { GeneralService } from "../general-service/general.service";
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Plugins, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications,Browser,LocalNotifications } = Plugins;
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
    private router: Router,
    public menuCtrl: MenuController,
    private general:GeneralService) { }

  ngOnInit() {
    if( window.localStorage.getItem('KEY_email') ) {
      let form = {
        email: window.localStorage.getItem('KEY_email'),
        password: window.localStorage.getItem('KEY_password'),
        device_type: 'device_type',
        device_token: 'device_token'
      }

      this.general.login(form).subscribe((data:any) => {
        if(data.status == '200') {
          this.general.userToken = data.result.token;
          this.general.userObject = data.result;
          this.preloadnotifications();

          console.log('AutoLogin Token', data.result.token);

        } else {
          this.general.presentAlertMsg('Invalid Login Data');
          window.localStorage.removeItem('KEY_email');
          this.router.navigate(['/login']);
        }
      });
    }

    this.preloadnotifications();

    (this.general.customerMode) ? this.customerview = true : this.employeeview = true;
    console.log('CustomerView:',this.customerview);
    console.log('EmployeeView:',this.employeeview);

  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
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
    if(!this.general.userObject) return;
    this.general.getAllNotifications().subscribe((res:any) => {
      this.notifications = res;
      this.general.notifications = this.notifications;

      this.notificationcount = 0;
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
    });
  }

  async openBrowser() {
    await Browser.open({ url: 'https://amalooloo.shop' });
  }

}
