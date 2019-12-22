import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/general-service/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-construction-contractor-details',
  templateUrl: './construction-contractor-details.page.html',
  styleUrls: ['./construction-contractor-details.page.scss'],
})
export class ConstructionContractorDetailsPage implements OnInit {

  contractorForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private general:GeneralService) {

      this.contractorForm = this.fb.group({
        name: [null, Validators.required],
        surname: [null, Validators.required],
        signature: [null, Validators.required],
        terms: false,
      });
    }

  ngOnInit() {
  }


  next() {
    if(!this.contractorForm.valid) {
      this.general.presentAlertMsg('Please fill the apove data');
      return;
    }

    this.general.loadsheetData.contractor_details.name = this.contractorForm.value.name;
    this.general.loadsheetData.contractor_details.surname = this.contractorForm.value.surname;
    this.general.loadsheetData.contractor_details.sign = this.contractorForm.value.signature;
    this.router.navigate(['construction/construction-betram-emp']);
  }

}
