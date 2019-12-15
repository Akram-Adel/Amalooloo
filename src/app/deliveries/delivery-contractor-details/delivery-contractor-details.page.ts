import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/general-service/general.service';
import { Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-delivery-contractor-details',
  templateUrl: './delivery-contractor-details.page.html',
  styleUrls: ['./delivery-contractor-details.page.scss'],
})
export class DeliveryContractorDetailsPage implements OnInit {

  loadsheet:any;
  completedStatus:boolean;
  buttonText = 'Next';

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
    this.loadsheet = this.general.detailedDelivery;
    this.completedStatus = this.general.isDeliveryCompleted;

    if(this.completedStatus) {
      this.buttonText = "Done";
      let driverControls = this.contractorForm.controls;

      driverControls.name.setValue(this.loadsheet.driver_name);
      driverControls.surname.setValue(this.loadsheet.driver_surname);
      driverControls.terms.setValue(true);
    }
  }


  next() {
    if(!this.contractorForm.valid && !this.completedStatus) {
      this.general.presentAlertMsg('Please fill the apove data');
      return;
    }

    this.general.loadsheetData.contractor_details.cont_name = this.contractorForm.value.name;
    this.general.loadsheetData.contractor_details.cont_surname = this.contractorForm.value.surname;
    this.general.loadsheetData.contractor_details.cont_sign = this.contractorForm.value.signature;

    if(this.completedStatus == false) {
      this.router.navigate(['deliveries/delivery-completed']);

    } else {
      this.router.navigate(['deliveries']);

    }
  }

}
