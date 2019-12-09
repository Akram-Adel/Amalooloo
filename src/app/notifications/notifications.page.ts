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

    this.storage.get('notifications').then((val) => {
      let temparr = JSON.parse(val);

      this.loadnotifications(temparr)
   
    });


  }


  doRefresh(event:any) {
    this.isLoading = true;
    this.notifications = [];

    this.storage.get('notifications').then((val) => {
      let temparr = JSON.parse(val);

      this.loadnotifications(temparr)
      event.target.complete();
    });
    
   
  }

  loadnotifications(results:any) {
   
    this.notifications = results;
    this.isLoading = false;
    if(results.status != 200) this.general.presentAlertMsg(results.message);
  }
}
