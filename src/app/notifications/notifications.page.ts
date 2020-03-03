import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  isLoading = true;
  notifications = []


  constructor(private general:GeneralService,private storage: Storage) { }


  ngOnInit() {
    this.isLoading = true;
    this.notificationsHandler();
  }


  doRefresh(event:any) {
    this.isLoading = true;
    this.notifications = [];
    this.notificationsHandler();
  }

  ionViewDidLeave(){
  }

  notificationsHandler() {

    this.general.getAllNotifications().subscribe((res:any) => {
      console.log('notifications results', res);
      this.notifications = res;
      this.general.notifications = this.notifications;
      this.isLoading = false;
      if(this.notifications.length < 0){
        this.general.presentAlertMsg("No Notifications Found");
      }
    });

  }

  /**
   * markread
   */
   markRead(notificationID) {
    this.general.setAllNotificationsRead(notificationID).subscribe((res:any) => console.log('notification read result',res) );
  }

}
