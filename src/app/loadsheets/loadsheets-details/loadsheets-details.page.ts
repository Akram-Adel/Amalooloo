import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-loadsheets-details',
  templateUrl: './loadsheets-details.page.html',
  styleUrls: ['./loadsheets-details.page.scss'],
})
export class LoadsheetsDetailsPage implements OnInit {

  sheetNo:string;
  loadsheet:any;
  isCompleted = true;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private general:GeneralService) {
    }

  ngOnInit() {
    if(!this.general.allLoadsheets) {
      this.general.presentAlertHandler('This session has expired', () => {this.router.navigate(['/loadsheets'])});
    }
    this.general.allOrders = [];

    this.sheetNo = this.route.snapshot.paramMap.get('no');
    this.loadLoadsheet();
  }


  loadLoadsheet() {
    this.loadsheet = _.filter(this.general.allLoadsheets, ['loadsheet_no', this.sheetNo])[0];
    if(this.loadsheet.loadsheet_status != "completed") this.isCompleted = false;

    console.log(this.loadsheet);
  }

  addQuantitiesLoaded() {
    this.router.navigate(['/loadsheets/add-quantities-loaded/', this.loadsheet.loadsheet_id]);
  }

}
