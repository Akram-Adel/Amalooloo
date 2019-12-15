import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-view-past-construction',
  templateUrl: './view-past-construction.page.html',
  styleUrls: ['./view-past-construction.page.scss'],
})
export class ViewPastConstructionPage implements OnInit {

  isLoading = true;
  pastConstruction = []

  constructor(
    private general:GeneralService) { }

  ngOnInit() {
    this.general.getConstructionList('completed').subscribe((res:any) => this.loadConstructions(res));
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.pastConstruction = [];

    this.general.getConstructionList('completed').subscribe((res:any) => {
      this.loadConstructions(res);
      event.target.complete();
    });
  }

  loadConstructions(results:any) {
    console.log(results);
    this.pastConstruction = results.result;
    this.isLoading = false;
    if(results.status != 200) this.general.presentAlertMsg(results.message);
  }

}
