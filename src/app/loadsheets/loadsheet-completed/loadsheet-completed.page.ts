import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-loadsheet-completed',
  templateUrl: './loadsheet-completed.page.html',
  styleUrls: ['./loadsheet-completed.page.scss'],
})
export class LoadsheetCompletedPage implements OnInit {

  isConnecting = true;

  constructor(public general:GeneralService) { }

  ngOnInit() {
    
    if(this.general.isLoadsheetCompleted) {
      this.isConnecting = false;

    } else {


      if(this.general.networkstatus != true){
        this.isConnecting = false;
        this.general.StoreLoadsheet();
        this.general.dataCleanup();
        this.general.presentAlertHandler("Data stored for Sync",{});

      }
      if(this.general.networkstatus == true){
        this.general.submitLoadsheet().subscribe((res:any) => {
          this.isConnecting = false;
          if(res.status != '200') {
            this.general.presentAlertMsg(res.message);
          }
          this.general.dataCleanup();
  
          console.log(res);
        })
      
      }



    }
  }

}
