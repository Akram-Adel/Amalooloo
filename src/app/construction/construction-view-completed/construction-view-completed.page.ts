import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-construction-view-completed',
  templateUrl: './construction-view-completed.page.html',
  styleUrls: ['./construction-view-completed.page.scss'],
})
export class ConstructionViewCompletedPage implements OnInit {

  completedConstruction = [];

  constructor() { }

  ngOnInit() {
  }

}
