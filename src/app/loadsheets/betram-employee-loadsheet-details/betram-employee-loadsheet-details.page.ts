import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/general-service/general.service';
import { Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-betram-employee-loadsheet-details',
  templateUrl: './betram-employee-loadsheet-details.page.html',
  styleUrls: ['./betram-employee-loadsheet-details.page.scss'],
})
export class BetramEmployeeLoadsheetDetailsPage implements OnInit {

  loadsheet:any;
  betramForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private general:GeneralService) {

      this.betramForm = this.fb.group({
        name: [null, Validators.required],
        surname: [null, Validators.required],
        time: [null, Validators.required],
        signature: [null, Validators.required],
        terms: false,
      });
    }

  ngOnInit() {
    this.loadsheet = _.filter(this.general.allLoadsheets, ['loadsheet_id', this.general.loadsheetData.loadsheet_id])[0];

    if(this.general.isLoadsheetCompleted) {
      let betramControls = this.betramForm.controls;

      betramControls.name.setValue(this.loadsheet.driver_name);
      betramControls.surname.setValue(this.loadsheet.driver_surname);
      betramControls.terms.setValue(true);
    }
  }


  next() {
    if(!this.betramForm.valid && !this.general.isLoadsheetCompleted) {
      this.general.presentAlertMsg('Please fill the apove data');
      return;
    }

    this.general.loadsheetData.betram_emp_details.name = this.betramForm.value.name;
    this.general.loadsheetData.betram_emp_details.surname = this.betramForm.value.surname;
    this.general.loadsheetData.betram_emp_details.time = this.betramForm.value.time;
    this.general.loadsheetData.betram_emp_details.sign = this.betramForm.value.signature;
    this.router.navigate(['loadsheets/loadsheet-completed']);
  }

}
