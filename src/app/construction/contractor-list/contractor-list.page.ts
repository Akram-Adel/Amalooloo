import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.page.html',
  styleUrls: ['./contractor-list.page.scss'],
})
export class ContractorListPage implements OnInit {

  isLoading = true;
  projectId:number;
  contractorList = []

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    public general:GeneralService) { }

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id');
    this.general.getContractorList(this.projectId).subscribe((res:any) => this.loadContractors(res));
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.contractorList = [];

    this.general.getContractorList(this.projectId).subscribe((res:any) => {
      this.loadContractors(res);
      event.target.complete();
    });
  }

  loadContractors(results:any) {
    console.log(results);
    this.contractorList = results.result;
    this.isLoading = false;
    if(results.status != 200) this.general.presentAlertMsg(results.message);
  }


  selectContractor(item:any) {
    this.general.loadsheetData.contractor_id = item.id;

    this.router.navigate(['/construction/project-details', item.project_id]);
  }

}
