import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-start-new-deliveries',
  templateUrl: './start-new-deliveries.page.html',
  styleUrls: ['./start-new-deliveries.page.scss'],
})
export class StartNewDeliveriesPage implements OnInit {

  isLoading = true;
  deliveryProjects = []

  constructor(private general:GeneralService) { }

  ngOnInit() {
    this.general.getDeliveryList().subscribe((res:any) => this.loadDeliveries(res));
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.deliveryProjects = [];

    this.general.getDeliveryList().subscribe((res:any) => {
      this.loadDeliveries(res);
      event.target.complete();
    });
  }

  loadDeliveries(results:any) {
    console.log(results);
    this.general.allDeliveries = results.result;

    this.deliveryProjects = _.filter(this.general.allDeliveries, ['delivery_status', "initiated"]);;
    this.isLoading = false;
    if(results.status != 200) this.general.presentAlertMsg(results.message);
    if(this.deliveryProjects.length == 0) this.general.presentAlertMsg('No Data Found');
  }

}
