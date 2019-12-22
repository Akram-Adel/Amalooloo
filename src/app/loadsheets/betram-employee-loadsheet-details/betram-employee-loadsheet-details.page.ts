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
  completedStatus:boolean;
  betramForm:FormGroup;
  buttonText = "Next"

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
    if(this.general.allLoadsheets  && this.general.allLoadsheets != null) {
      this.loadsheet = _.filter(this.general.allLoadsheets, ['loadsheet_id', this.general.loadsheetData.loadsheet_id])[0];
      this.completedStatus = this.general.isLoadsheetCompleted;

    } else if(this.general.allDeliveries && this.general.allDeliveries != null) {
      this.loadsheet = this.general.detailedDelivery;
      this.completedStatus = this.general.isDeliveryCompleted;
    }

    if(this.completedStatus) {
      if(this.general.allLoadsheets  && this.general.allLoadsheets != null) this.buttonText = "Done";
      let betramControls = this.betramForm.controls;

      betramControls.name.setValue(this.loadsheet.emp_name);
      betramControls.surname.setValue(this.loadsheet.emp_surname);
      betramControls.terms.setValue(true);
    }
  }


  next() {
    if(!this.betramForm.valid && !this.completedStatus) {
      this.general.presentAlertMsg('Please fill the apove data');
      return;
    }

    this.general.loadsheetData.betram_emp_details.name = this.betramForm.value.name;
    this.general.loadsheetData.betram_emp_details.surname = this.betramForm.value.surname;
    this.general.loadsheetData.betram_emp_details.emp_mention_time = this.betramForm.value.time;
    this.general.loadsheetData.betram_emp_details.sign = this.betramForm.value.signature;

    if(this.general.allLoadsheets  && this.general.allLoadsheets != null && this.completedStatus == false) {
      this.router.navigate(['loadsheets/loadsheet-completed']);
    } else if (this.general.allLoadsheets  && this.general.allLoadsheets != null && this.completedStatus) {
      this.router.navigate(['loadsheets']);

    } else if (this.general.allDeliveries && this.general.allDeliveries != null) {
      this.router.navigate(['deliveries/delivery-contractor-details'])
    }
  }

}
