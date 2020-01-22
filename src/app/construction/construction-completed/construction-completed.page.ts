import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-construction-completed',
  templateUrl: './construction-completed.page.html',
  styleUrls: ['./construction-completed.page.scss'],
})
export class ConstructionCompletedPage implements OnInit {

  isConnecting = true;

  constructor(public general:GeneralService) { }

  ngOnInit() {
    if(this.general.isLoadsheetCompleted) {
      this.isConnecting = false;

    } else {
      if (this.general.constructionStatus == 'Construction') {
        this.general.submitConstruction().subscribe(res => {
          this.isConnecting = false;

          console.log(res);
        });

      } else {
        this.general.submitMaintenance().subscribe(res => {
          this.isConnecting = false;

          console.log(res);
        });
      };
    }
  }

}
