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
      this.general.submitDelivery().subscribe(res => {
        this.isConnecting = false;
        this.general.loadsheetData_CleanUp();

        console.log(res);
      })
    }
  }

}
