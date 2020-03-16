import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-view-past-loadsheets',
  templateUrl: './view-past-loadsheets.page.html',
  styleUrls: ['./view-past-loadsheets.page.scss'],
})
export class ViewPastLoadsheetsPage implements OnInit {

  isLoading = true;
  pastLoadsheets = []

  constructor(private general:GeneralService) { }

  ngOnInit() {
    console.log(this.general.networkstatus);
    
    if(this.general.networkstatus != true){


   this.general.getPreload("getLoadsheetList").then((res:any)=>{

    console.log(res);
    this.loadLoadsheetsoffline(res);

   })

   
  }
    
    if(this.general.networkstatus == true){
      this.general.getLoadsheetList().subscribe((res:any) => {
      
      
        this.loadLoadsheets(res)
        console.log(res);
        
      });
   
  }


    

  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.pastLoadsheets = [];


    if(this.general.networkstatus != true){


      this.general.getPreload("getLoadsheetList").then((res:any)=>{
   
       console.log(res);
       this.loadLoadsheetsoffline(res);
       event.target.complete();
      })
   
      
     }
       
       if(this.general.networkstatus == true){
         this.general.getLoadsheetList().subscribe((res:any) => {
         
         
           this.loadLoadsheets(res)
           console.log(res);
           event.target.complete();
         });
      
     }


  }

  loadLoadsheets(results:any) {
   
    this.general.allLoadsheets = results.result;

    this.pastLoadsheets = _.filter(results.result, ['loadsheet_status', "completed"]);
    this.isLoading = false;
    if(results.status != 200) this.general.presentAlertMsg(results.message);
    if(this.pastLoadsheets.length == 0) this.general.presentAlertMsg('No Data Found');
  }
  loadLoadsheetsoffline(results:any) {
 
    this.general.allLoadsheets = results;

    this.pastLoadsheets = _.filter(results, ['loadsheet_status', "completed"]);
    this.isLoading = false;
    // if(results.status != 200) this.general.presentAlertMsg(results.message);
    if(this.pastLoadsheets.length == 0) this.general.presentAlertMsg('No Offline Data Found');
  }

}
