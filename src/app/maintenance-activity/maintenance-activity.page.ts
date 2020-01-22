import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-maintenance-activity',
  templateUrl: './maintenance-activity.page.html',
  styleUrls: ['./maintenance-activity.page.scss'],
})
export class MaintenanceActivityPage implements OnInit {

  isLoading = true;
  maintenanceProjects = [];

  constructor(private general:GeneralService) { }

  ngOnInit() {
    this.general.getAllMaintenance().subscribe((res:any) => this.loadMaintenance(res));
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.maintenanceProjects = [];

    this.general.getAllMaintenance().subscribe((res:any) => {
      this.loadMaintenance(res);
      event.target.complete();
    });
  }

  loadMaintenance(results:any) {
    this.isLoading = false;
    this.general.loadsheetData.user_id = this.general.userObject.id;
    this.maintenanceProjects = results.result;

    console.log('Maintenance Result', results);
  }

}
