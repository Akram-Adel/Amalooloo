import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-new-construction',
  templateUrl: './new-construction.page.html',
  styleUrls: ['./new-construction.page.scss'],
})
export class NewConstructionPage implements OnInit {

  isLoading = true;
  constructionProjects = []

  constructor(private general:GeneralService) { }

  ngOnInit() {
    this.general.getConstructionList().subscribe((res:any) => this.loadConstructions(res));
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.constructionProjects = [];

    this.general.getConstructionList().subscribe((res:any) => {
      this.loadConstructions(res);
      event.target.complete();
    });
  }

  loadConstructions(results:any) {
    console.log(results);
    this.constructionProjects = results.result;
    this.isLoading = false;
    if(results.status != 200) this.general.presentAlertMsg(results.message);
  }

}
