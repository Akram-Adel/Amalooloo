import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-user-constructions',
  templateUrl: './user-constructions.page.html',
  styleUrls: ['./user-constructions.page.scss'],
})
export class UserConstructionsPage implements OnInit {

  isLoading = true;
  constructionProjects = [];

  constructor(private general:GeneralService) { }

  ngOnInit() {
    this.general.getUserConstructionList().subscribe((res:any) => this.loadConstructions(res));
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.constructionProjects = [];

    this.general.getUserConstructionList().subscribe((res:any) => {
      this.loadConstructions(res);
      event.target.complete();
    });
  }

  loadConstructions(results:any) {
    this.isLoading = false;
    this.constructionProjects = results.result.result;

    console.log(results);
  }

}
