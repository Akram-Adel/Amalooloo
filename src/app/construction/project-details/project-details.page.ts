import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {

  projectId:number;

  constructor(
    private route:ActivatedRoute,
    public general:GeneralService) { }

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.general.loadsheetData.project_id = this.projectId;
  }

  newConstruction() {
    this.general.constructionNumber = null;
  }

}
