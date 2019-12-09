import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general-service/general.service';

@Component({
  selector: 'app-mode-selection',
  templateUrl: './mode-selection.page.html',
  styleUrls: ['./mode-selection.page.scss'],
})
export class ModeSelectionPage implements OnInit {

  constructor(private general:GeneralService) { }

  ngOnInit() {
  }

  selectMode(mode:string) {
    (mode == 'customer') ? this.general.changeMode(true) : this.general.changeMode(false);
  }

}
