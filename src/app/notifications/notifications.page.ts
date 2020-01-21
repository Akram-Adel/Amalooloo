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
    this.general.getAllNotifications().subscribe((res:any) =>this.notifications = res.result );

    this.general.notifications = this.notifications;
    this.isLoading = false;
    if(this.notifications.length < 0){


      this.general.presentAlertMsg("No Notifications Found");

     
    }

  }


  doRefresh(event:any) {
    this.isLoading = true;
    this.notifications = [];
    this.general.getAllNotifications().subscribe((res:any) =>this.notifications = res.result );

    this.general.notifications = this.notifications;
    this.isLoading = false;
    if(this.notifications.length < 0){


      this.general.presentAlertMsg("No Notifications Found");

     
    }

    
   
  }
  ionViewDidLeave(){

this.markread();



  }
  /**
   * markread
   */
   markread() {
    this.general.setAllNotificationsRead().subscribe((res:any) =>console.log(res) );

    
  }

}
