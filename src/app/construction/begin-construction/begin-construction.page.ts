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

  imageResponse: any;
  options: any;
  requestForm:FormGroup;
  PhotosText = "Select";
  Photo1:any;
  Photo2:any;
  Photo3:any;
  GPS:any;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private general:GeneralService) {

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
  }

  async getCurrentPosition() {
    this.GPS = await Geolocation.getCurrentPosition();
    console.log(this.GPS);
  }


  async SubmitRequest(){
    if(!this.requestForm.valid) {
      this.general.presentAlertMsg('Please fill the apove data');
      return;
    }

    this.general.loadsheetData.construction_address = this.requestForm.value.address;
    this.general.loadsheetData.beneficiary_id = this.requestForm.value.idNo;
    this.general.loadsheetData.beneficiary_stand_no = this.requestForm.value.standNo;
    this.general.loadsheetData.beneficiary_description = this.requestForm.value.description;
    this.general.loadsheetData.const_latitude = this.GPS.coords.latitude;
    this.general.loadsheetData.const_longitude = this.GPS.coords.longitude;
    this.router.navigate(['construction/question'])

  }

}
