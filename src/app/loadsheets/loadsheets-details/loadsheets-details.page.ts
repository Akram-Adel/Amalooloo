import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  buttonText = 'View Quantities Loaded';

  constructor(
    private route:ActivatedRoute,
    private general:GeneralService) {
    }

  ngOnInit() {
    this.general.allOrders = [];

    this.sheetNo = this.route.snapshot.paramMap.get('no');
    this.loadLoadsheet();
  }


  loadLoadsheet() {
    this.loadsheet = _.filter(this.general.allLoadsheets, ['loadsheet_no', this.sheetNo])[0];
    if(this.loadsheet.loadsheet_status != "completed") {
      this.general.isLoadsheetCompleted = false;
      this.buttonText = 'Add Quantities Loaded'

    } else {this.general.isLoadsheetCompleted = true}

    console.log(this.loadsheet);
  }

}
