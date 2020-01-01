import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-maintenance-project-list',
  templateUrl: './maintenance-project-list.page.html',
  styleUrls: ['./maintenance-project-list.page.scss'],
})
export class MaintenanceProjectListPage implements OnInit {

  isLoading = true;
  maintenanceId:number;
  maintenanceProjects = [];

  constructor(
    private route:ActivatedRoute,
    private general:GeneralService) { }

  ngOnInit() {
    this.maintenanceId = +this.route.snapshot.paramMap.get('id');
    this.general.getMaintenanceProjectList(this.maintenanceId).subscribe((res:any) => this.loadMaintenanceProjects(res))
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.maintenanceProjects = [];

    this.general.getMaintenanceProjectList(this.maintenanceId).subscribe((res:any) => {
      this.loadMaintenanceProjects(res);
      event.target.complete();
    });
  }

  loadMaintenanceProjects(results:any) {
    this.isLoading = false;
    this.maintenanceProjects = results.result;

    console.log('Maintenance Projects Result', results);
  }

}
