import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/general-service/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-construction-betram-emp',
  templateUrl: './construction-betram-emp.page.html',
  styleUrls: ['./construction-betram-emp.page.scss'],
})
export class ConstructionBetramEmpPage implements OnInit {

  betramForm:FormGroup;
  formUI:string;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    public general:GeneralService) {

      this.betramForm = this.fb.group({
        name: [null, Validators.required],
        surname: [null, Validators.required],
        signature: [null, Validators.required],
        terms: false,
      });
    }

  ngOnInit() {
    this.setUIChanges();
  }

  setUIChanges() {
    if (this.general.constructionType == 'school') {
      this.formUI = 'Please enter Amalooloo Representative details below';

    } else {
      this.formUI = 'Please enter Betram employee details below:';
    }
  }


  next() {
    if(!this.betramForm.valid) {
      this.general.presentAlertMsg('Please fill the apove data');
      return;
    }

    this.general.loadsheetData.betram_emp_details.name = this.betramForm.value.name;
    this.general.loadsheetData.betram_emp_details.surname = this.betramForm.value.surname;
    this.general.loadsheetData.betram_emp_details.sign = this.betramForm.value.signature;
    this.router.navigate(['construction/construction-completed']);
  }

}
