import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/general-service/general.service';
import { Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-driver-details-loadsheet',
  templateUrl: './driver-details-loadsheet.page.html',
  styleUrls: ['./driver-details-loadsheet.page.scss'],
})
export class DriverDetailsLoadsheetPage implements OnInit {

  loadsheet:any;
  driverForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private general:GeneralService) {

      this.driverForm = this.fb.group({
        name: [null, Validators.required],
        surname: [null, Validators.required],
        signature: [null, Validators.required],
        terms: false,
      });
    }

  ngOnInit() {
    this.loadsheet = _.filter(this.general.allLoadsheets, ['loadsheet_id', this.general.loadsheetData.loadsheet_id])[0];

    if(this.general.isLoadsheetCompleted) {
      let driverControls = this.driverForm.controls;

      driverControls.name.setValue(this.loadsheet.driver_name);
      driverControls.surname.setValue(this.loadsheet.driver_surname);
      driverControls.terms.setValue(true);
    }
  }


  next() {
    if(!this.driverForm.valid && !this.general.isLoadsheetCompleted) {
      this.general.presentAlertMsg('Please fill the apove data');
      return;
    }

    this.general.loadsheetData.driver_details.name = this.driverForm.value.name;
    this.general.loadsheetData.driver_details.surname = this.driverForm.value.surname;
    this.general.loadsheetData.driver_details.sign = this.driverForm.value.signature;
    this.router.navigate(['loadsheets/betram-employee-loadsheet-details']);
  }

}
