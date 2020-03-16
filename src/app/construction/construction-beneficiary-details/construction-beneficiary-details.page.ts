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
  formUI:any;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    public general:GeneralService) {

      this.beneficiaryForm = this.fb.group({
        name: [null, Validators.required],
        surname: [null, Validators.required],
        signature: [null, Validators.required],
        terms: false,
      });
    }

  ngOnInit() {
    this.fillFormData();
    console.log(this.general.constructionType);
    
    this.setUIChanges();
  }

  fillFormData() {
    let requestControls = this.beneficiaryForm.controls,
      sheetData = this.general.loadsheetData;

    if(sheetData.beneficiary_details.name) requestControls.name.setValue(sheetData.beneficiary_details.name);
    if(sheetData.beneficiary_details.surname) requestControls.surname.setValue(sheetData.beneficiary_details.surname);
  }

  setUIChanges() {
    if (this.general.constructionType == 'school') {
      this.formUI = {
        header: 'Please enter School Representative details below:',
        name: 'School Name',
        surname: 'National Emis no',
      }

    } else {
      this.formUI = {
        header: 'Please enter beneficiary details below:',
        name: 'Beneficiary Name',
        surname: 'Beneficiary Surname',
      }
    }
  }


  next() {
    if(!this.beneficiaryForm.valid) {
      this.general.presentAlertMsg('Please fill the apove data');
      return;
    }

    this.general.loadsheetData.beneficiary_details.name = this.beneficiaryForm.value.name;
    this.general.loadsheetData.beneficiary_details.surname = this.beneficiaryForm.value.surname;
    this.general.loadsheetData.beneficiary_details.sign = this.beneficiaryForm.value.signature;
    this.router.navigate(['construction/construction-contractor-details']);
  }

}
