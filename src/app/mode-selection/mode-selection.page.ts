import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { GeneralService } from '../general-service/general.service';

@Component({
  selector: 'app-mode-selection',
  templateUrl: './mode-selection.page.html',
  styleUrls: ['./mode-selection.page.scss'],
})
export class ModeSelectionPage implements OnInit {

  constructor(
    public menuCtrl: MenuController,
    private general:GeneralService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  selectMode(mode:string) {
    (mode == 'customer') ? this.general.changeMode(true) : this.general.changeMode(false);
  }

}
