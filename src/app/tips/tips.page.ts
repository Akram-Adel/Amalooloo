import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from '../general-service/general.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  constructor(
    private modalController:ModalController,
    public general:GeneralService) { }

  ngOnInit() {
    this.general.getUploadedPdf().subscribe(res => console.log(res));
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
