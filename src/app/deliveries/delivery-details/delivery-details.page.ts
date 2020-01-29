import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
})
export class DeliveryDetailsPage implements OnInit {

  sheetNo:string;
  loadsheet:any;
  buttonText = 'View Delivered Quantities';

  constructor(
    private route:ActivatedRoute,
    public general:GeneralService) { }

  ngOnInit() {
    this.sheetNo = this.route.snapshot.paramMap.get('no');
    this.general.detailedDelivery = null;
    this.loadDelivery()
  }


  loadDelivery() {
    this.loadsheet = _.filter(this.general.allDeliveries, ['delivery_no', this.sheetNo])[0];
    this.general.getDeliveryDetail(this.loadsheet.id).subscribe((res:any) => this.general.detailedDelivery = res.result[0])
    if(this.loadsheet.delivery_status != "completed") {
      this.general.isDeliveryCompleted = false;
      this.buttonText = 'Add Delivered Quantities'

    } else {this.general.isDeliveryCompleted = true}

    console.log(this.loadsheet);
  }

}
