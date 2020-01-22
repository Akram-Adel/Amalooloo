import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import { GeneralService } from '../../general-service/general.service';



@Component({
  selector: 'app-begin-construction',
  templateUrl: './begin-construction.page.html',
  styleUrls: ['./begin-construction.page.scss'],
})
export class BeginConstructionPage implements OnInit {

  requestForm:FormGroup;
  GPS:any;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    public general:GeneralService) {

      this.requestForm = this.fb.group({
        firstname: [null, Validators.required],
        surname: [null, Validators.required],
        address: [null, Validators.required],
        idNo: [null, Validators.required],
        standNo: [null, Validators.required],
        description: [null, Validators.required],
      });
    }


  ngOnInit() {
    this.getCurrentPosition();
    this.fillFormData();
  }

  async getCurrentPosition() {
    this.GPS = await Geolocation.getCurrentPosition();
    console.log("Current Position", this.GPS);
  }

  fillFormData() {
    let requestControls = this.requestForm.controls,
      sheetData = this.general.loadsheetData;

    if(sheetData.beneficiary_details.name) requestControls.firstname.setValue(sheetData.beneficiary_details.name);
    if(sheetData.beneficiary_details.surname) requestControls.surname.setValue(sheetData.beneficiary_details.surname);
    if(sheetData.construction_address) requestControls.address.setValue(sheetData.construction_address);
    if(sheetData.beneficiary_id) requestControls.idNo.setValue(sheetData.beneficiary_id);
    if(sheetData.beneficiary_stand_no) requestControls.standNo.setValue(sheetData.beneficiary_stand_no);
    if(sheetData.beneficiary_description) requestControls.description.setValue(sheetData.beneficiary_description);
  }


  async SubmitRequest(){
    if(!this.requestForm.valid) {
      this.general.presentAlertMsg('Please fill the above data');
      return;
    }

    this.general.loadsheetData.construction_address = this.requestForm.value.address;
    this.general.loadsheetData.beneficiary_id = +this.requestForm.value.idNo;
    this.general.loadsheetData.beneficiary_stand_no = this.requestForm.value.standNo.toString();
    this.general.loadsheetData.beneficiary_description = this.requestForm.value.description;
    this.general.loadsheetData.const_latitude = this.GPS.coords.latitude.toString();
    this.general.loadsheetData.const_longitude = this.GPS.coords.longitude.toString();
    this.router.navigate(['construction/question'])

  }

}
