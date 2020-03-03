import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import { GeneralService } from '../../general-service/general.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';


@Component({
  selector: 'app-begin-construction',
  templateUrl: './begin-construction.page.html',
  styleUrls: ['./begin-construction.page.scss'],
})
export class BeginConstructionPage implements OnInit {

  requestForm:FormGroup;
  GPS:any;
  formUI:any;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    public general:GeneralService,
    public launchNavigator: LaunchNavigator) {

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
    this.setUIChanges();
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

  setUIChanges() {
    if (this.general.constructionType == 'school') {
      this.formUI = {
        name: 'School Name',
        surname: 'Principal',
        id_number: 'National EMIS No',
        stand_number: 'SGB Chairman'
      }

    } else {
      this.formUI = {
        name: 'Beneficiary Name',
        surname: 'Beneficiary Surname',
        id_number: 'Beneficiary ID-Number',
        stand_number: 'Beneficiary Stand No'
      }
    }
  }


  Navigate(){

    
   
    

    let options: LaunchNavigatorOptions = {
      start: ""+this.GPS.coords.latitude.toString()+","+this.GPS.coords.longitude.toString()+"",
    };
    
    this.launchNavigator.navigate([ this.general.navLat, this.general.navlong],options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );


  }

  async SubmitRequest(){
    if(!this.requestForm.valid) {
      this.general.presentAlertMsg('Please fill the above data');
      return;
    }

    this.general.loadsheetData.beneficiary_details.name = this.requestForm.value.firstname;
    this.general.loadsheetData.beneficiary_details.surname = this.requestForm.value.surname
    this.general.loadsheetData.construction_address = this.requestForm.value.address;
    this.general.loadsheetData.beneficiary_id = +this.requestForm.value.idNo;
    this.general.loadsheetData.beneficiary_stand_no = this.requestForm.value.standNo.toString();
    this.general.loadsheetData.beneficiary_description = this.requestForm.value.description;
    this.general.loadsheetData.const_latitude = this.GPS.coords.latitude.toString();
    this.general.loadsheetData.const_longitude = this.GPS.coords.longitude.toString();
    this.router.navigate(['construction/question'])

  }

}
