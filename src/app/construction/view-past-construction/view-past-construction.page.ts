import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-past-construction',
  templateUrl: './view-past-construction.page.html',
  styleUrls: ['./view-past-construction.page.scss'],
})
export class ViewPastConstructionPage implements OnInit {

  pastConstruction = []

  constructor() { }

  ngOnInit() {
  }

}
