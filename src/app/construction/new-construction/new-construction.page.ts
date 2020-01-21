import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-new-construction',
  templateUrl: './new-construction.page.html',
  styleUrls: ['./new-construction.page.scss'],
})
export class NewConstructionPage implements OnInit {

  isLoading = true;
  status:string;
  constructionProjects = []

  constructor(
    private route:ActivatedRoute,
    public general:GeneralService) { }

  ngOnInit() {
    this.status = this.route.snapshot.paramMap.get('status');
    (this.status == 'initiated') ? this.general.isNewConstruction = true : this.general.isNewConstruction = false;
    this.general.getConstructionList(this.status).subscribe((res:any) => this.loadConstructions(res));
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.constructionProjects = [];

    this.general.getConstructionList(this.status).subscribe((res:any) => {
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
