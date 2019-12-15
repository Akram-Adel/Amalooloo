import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/general-service/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-construction-beneficiary-details',
  templateUrl: './construction-beneficiary-details.page.html',
  styleUrls: ['./construction-beneficiary-details.page.scss'],
})
export class ConstructionBeneficiaryDetailsPage implements OnInit {

  beneficiaryForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private general:GeneralService) {

      this.beneficiaryForm = this.fb.group({
        name: [null, Validators.required],
        surname: [null, Validators.required],
        signature: [null, Validators.required],
        terms: false,
      });
    }

  ngOnInit() {
  }


  next() {
    if(!this.beneficiaryForm.valid) {
      this.general.presentAlertMsg('Please fill the apove data');
      return;
    }

    this.general.loadsheetData.beneficiary_details.beneficiary_name = this.beneficiaryForm.value.name;
    this.general.loadsheetData.beneficiary_details.beneficiary_surname = this.beneficiaryForm.value.surname;
    this.general.loadsheetData.beneficiary_details.beneficiary_sign = this.beneficiaryForm.value.signature;
    this.router.navigate(['construction/construction-contractor-details']);
  }

}
