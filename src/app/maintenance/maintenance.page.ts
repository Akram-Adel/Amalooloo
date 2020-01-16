import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general-service/general.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.page.html',
  styleUrls: ['./maintenance.page.scss'],
})
export class MaintenancePage implements OnInit {

  constructor(private general:GeneralService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.general.constructionStatus = "Maintenance";
  }

}
