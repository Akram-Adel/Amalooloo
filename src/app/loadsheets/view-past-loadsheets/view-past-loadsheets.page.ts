import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-view-past-loadsheets',
  templateUrl: './view-past-loadsheets.page.html',
  styleUrls: ['./view-past-loadsheets.page.scss'],
})
export class ViewPastLoadsheetsPage implements OnInit {

  isLoading = true;
  pastLoadsheets = []

  constructor(private general:GeneralService) { }

  ngOnInit() {
    this.general.getLoadsheetList().subscribe((res:any) => this.loadLoadsheets(res));
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.pastLoadsheets = [];

    this.general.getLoadsheetList().subscribe((res:any) => {
      this.loadLoadsheets(res);
      event.target.complete();
    });
  }

  loadLoadsheets(results:any) {
    console.log(results);
    this.general.allLoadsheets = results.result;

    this.pastLoadsheets = _.filter(results.result, ['loadsheet_status', "completed"]);
    this.isLoading = false;
    if(results.status != 200) this.general.presentAlertMsg(results.message);
    if(this.pastLoadsheets.length == 0) this.general.presentAlertMsg('No Data Found');
  }

}
