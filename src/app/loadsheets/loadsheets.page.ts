import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general-service/general.service';

@Component({
  selector: 'app-loadsheets',
  templateUrl: './loadsheets.page.html',
  styleUrls: ['./loadsheets.page.scss'],
})
export class LoadsheetsPage implements OnInit {

  constructor(
    public general:GeneralService) { }

  ngOnInit() {
    this.general.allDeliveries = null;
    this.general.isDeliveryCompleted = null;
  }

}
