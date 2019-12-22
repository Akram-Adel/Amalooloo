import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-add-quantities-loaded',
  templateUrl: './add-quantities-loaded.page.html',
  styleUrls: ['./add-quantities-loaded.page.scss'],
})
export class AddQuantitiesLoadedPage implements OnInit {

  isLoading = true;
  completedStatus:boolean;
  loadsheetId:number;
  loadedQuantities = [];
  buttonText = "Proceed"

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private general:GeneralService) { }

  ngOnInit() {
    if(this.general.allLoadsheets  && this.general.allLoadsheets != null) {
      this.completedStatus = this.general.isLoadsheetCompleted;

    } else if(this.general.allDeliveries && this.general.allDeliveries != null) {
      this.completedStatus = this.general.isDeliveryCompleted;
    }


    if(this.general.allOrders.length == 0) {
      this.loadsheetId = +this.route.snapshot.paramMap.get('id');
      this.general.getLoadsheetOrderList(this.loadsheetId).subscribe((res:any) => {

        res.result.forEach((el:any) => {
          (this.completedStatus) ? el.isRigth = true : el.isRigth = false;
          this.general.allOrders.push(el);
        });

        this.loadingDone();
        console.log(this.general.allOrders);
      });
    } else { this.loadingDone() }
  }


  loadingDone() {
    if(this.general.allLoadsheets  && this.general.allLoadsheets != null) {
      this.general.loadsheetData.loadsheet_id = this.loadsheetId;

    } else {
      this.general.loadsheetData.delivery_id = this.loadsheetId;
      this.general.loadsheetData.loadsheet_id = this.general.detailedDelivery.loadsheet_id;
    }
    this.loadedQuantities = this.general.allOrders;

    if(!this.completedStatus) this.buttonText = "Capture Quantities";

    this.isLoading = false;
  }

  captureQuantities() {
    let isRigthIndex = _.findIndex(this.general.allOrders, ['isRigth',false]);
    if(isRigthIndex != -1) {
      this.general.presentAlertMsg('Please complete all orders before proceeding');

    } else {
      this.router.navigate(['/loadsheets/loadsheets-feedback']);
    }
  }

}
