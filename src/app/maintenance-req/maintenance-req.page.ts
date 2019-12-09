import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';


@Component({
  selector: 'app-maintenance-req',
  templateUrl: './maintenance-req.page.html',
  styleUrls: ['./maintenance-req.page.scss'],
})
export class MaintenanceReqPage implements OnInit {

  isLoading = true;
  myRequests = [];

  constructor(private general:GeneralService) { }

  ngOnInit() {
    this.general.getMyMaintenanceReq().subscribe((res:any) => this.loadMaintenanceReq(res));
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.myRequests = [];

    this.general.getMyMaintenanceReq().subscribe((res:any) => {
      this.loadMaintenanceReq(res);
      event.target.complete();
    });
  }

  loadMaintenanceReq(results:any) {
    console.log(results);
    this.myRequests = results.maintenance_requests;
    this.isLoading = false;
    if(results.status != 200) this.general.presentAlertMsg(results.message);
  }

}
