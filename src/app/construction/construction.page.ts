import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general-service/general.service';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.page.html',
  styleUrls: ['./construction.page.scss'],
})
export class ConstructionPage implements OnInit {

  constructor(private general:GeneralService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.general.constructionStatus = "Construction";
  }

}
