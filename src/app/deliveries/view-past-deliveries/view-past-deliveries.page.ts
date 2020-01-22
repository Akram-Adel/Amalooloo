import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-view-past-deliveries',
  templateUrl: './view-past-deliveries.page.html',
  styleUrls: ['./view-past-deliveries.page.scss'],
})
export class ViewPastDeliveriesPage implements OnInit {

  isLoading = true;
  pastDeliveries = []

  constructor(private general:GeneralService) { }

  ngOnInit() {
    this.general.getDeliveryList().subscribe((res:any) => this.loadDeliveries(res));
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.pastDeliveries = [];

    this.general.getDeliveryList().subscribe((res:any) => {
      this.loadDeliveries(res);
      event.target.complete();
    });
  }

  loadDeliveries(results:any) {
    console.log(results);
    this.general.allDeliveries = results.result;

    this.pastDeliveries = _.filter(results.result, ['delivery_status', "completed"]);
    this.isLoading = false;
    if(results.status != 200) this.general.presentAlertMsg(results.message);
  }

}
