import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general-service/general.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.page.html',
  styleUrls: ['./deliveries.page.scss'],
})
export class DeliveriesPage implements OnInit {

  constructor(
    public general:GeneralService ) { }

  ngOnInit() {
    this.general.allLoadsheets = null;
    this.general.isLoadsheetCompleted = null;
  }

}
