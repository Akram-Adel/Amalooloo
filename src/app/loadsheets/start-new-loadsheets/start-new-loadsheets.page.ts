import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-start-new-loadsheets',
  templateUrl: './start-new-loadsheets.page.html',
  styleUrls: ['./start-new-loadsheets.page.scss'],
})
export class StartNewLoadsheetsPage implements OnInit {

  isLoading = true;
  loadsheetsProjects = [];

  constructor(private general:GeneralService) { }

  ngOnInit() {
    this.general.getLoadsheetList().subscribe((res:any) => this.loadLoadsheets(res));
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.loadsheetsProjects = [];

    this.general.getLoadsheetList().subscribe((res:any) => {
      this.loadLoadsheets(res);
      event.target.complete();
    });
  }

  loadLoadsheets(results:any) {
    console.log(results);
    this.general.allLoadsheets = results.result;

    this.loadsheetsProjects = _.filter(this.general.allLoadsheets, ['loadsheet_status', "initiated"]);
    this.isLoading = false;
    if(results.status != 200) this.general.presentAlertMsg(results.message);
  }

}
