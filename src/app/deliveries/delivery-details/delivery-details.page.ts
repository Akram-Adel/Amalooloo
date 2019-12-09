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
  loadsheet:any

  constructor(
    private route:ActivatedRoute,
    private general:GeneralService) { }

  ngOnInit() {
    this.sheetNo = this.route.snapshot.paramMap.get('no');
    this.general.getDeliveryList().subscribe(res => this.loadDelivery(res));
  }


  loadDelivery(res:any) {
    console.log(res);
    this.loadsheet = _.filter(res.result, ['loadsheet_no', this.sheetNo])[0];
  }

}
