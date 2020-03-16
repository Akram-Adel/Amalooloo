import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-delivery-completed',
  templateUrl: './delivery-completed.page.html',
  styleUrls: ['./delivery-completed.page.scss'],
})
export class DeliveryCompletedPage implements OnInit {

  isConnecting = true;

  constructor(public general:GeneralService) { }

  ngOnInit() {
    
    if(this.general.isLoadsheetCompleted) {
      this.isConnecting = false;

    } else {

if(this.general.networkstatus != true){
  this.isConnecting = false;
  this.general.StoreDelivery();
  this.general.dataCleanup();
  this.general.presentAlertHandler("Data stored for Sync",{});
}
if(this.general.networkstatus == true){
  this.general.submitDelivery().subscribe((res:any) => {
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
