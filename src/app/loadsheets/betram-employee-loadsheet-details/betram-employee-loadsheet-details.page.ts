import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/general-service/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-betram-employee-loadsheet-details',
  templateUrl: './betram-employee-loadsheet-details.page.html',
  styleUrls: ['./betram-employee-loadsheet-details.page.scss'],
})
export class BetramEmployeeLoadsheetDetailsPage implements OnInit {

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
  }


  next() {
    if(!this.betramForm.valid) {
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