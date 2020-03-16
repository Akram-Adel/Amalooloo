import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-construction-completed',
  templateUrl: './construction-completed.page.html',
  styleUrls: ['./construction-completed.page.scss'],
})
export class ConstructionCompletedPage implements OnInit {

  isConnecting = true;

  constructor(public general:GeneralService) { }

  ngOnInit() {
    this.general.networkstatus = true
    if(this.general.isLoadsheetCompleted) {
      this.isConnecting = false;

    } else {
      if (this.general.constructionStatus == 'Construction') {
        if(this.general.networkstatus != true){
          this.general.StoreConstruction();
          this.general.dataCleanup();
          this.general.presentAlertHandler("Data stored for Sync",{});

        }
        if(this.general.networkstatus == true){
          this.general.submitConstruction().subscribe(res => {
            this.isConnecting = false;
            this.general.dataCleanup();
  
            console.log(res);
          });
        
        }




 

      } else {

        if(this.general.networkstatus != true){
          this.general.StoreMaintenance();
          this.general.dataCleanup();
          this.general.presentAlertMsg("Data stored for Sync");

        }
        if(this.general.networkstatus == true){
          this.general.submitMaintenance().subscribe(res => {
            this.isConnecting = false;
            this.general.dataCleanup();
  
            console.log(res);
          });
        
        }

     
      };
    }
  }

}
