import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-construction-view-completed',
  templateUrl: './construction-view-completed.page.html',
  styleUrls: ['./construction-view-completed.page.scss'],
})
export class ConstructionViewCompletedPage implements OnInit {

  isLoading = true;
  projectId:number;
  completedConstruction:any;

  constructor(
    private route:ActivatedRoute,
    private general:GeneralService) { }

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.general.getCompletedConstructionList(this.projectId).subscribe((res:any) => this.loadCompletedConstruction(res))
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.completedConstruction = [];

    this.general.getCompletedConstructionList(this.projectId).subscribe((res:any) => {
      this.loadCompletedConstruction(res);
      event.target.complete();
    });
  }

  loadCompletedConstruction(res:any) {
    this.completedConstruction = res.result.result;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    for (let i = 0; i < this.completedConstruction.length; i++) {
      let date = new Date(this.completedConstruction[i].created_at),
      monthName = monthNames[date.getMonth()],
      year = date.getFullYear();

      this.completedConstruction[i].dateTxt = monthName +' '+year;
    }


    this.isLoading = false;
    console.log(res)
  }

}
