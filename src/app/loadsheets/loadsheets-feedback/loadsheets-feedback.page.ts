import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/general-service/general.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-loadsheets-feedback',
  templateUrl: './loadsheets-feedback.page.html',
  styleUrls: ['./loadsheets-feedback.page.scss'],
})
export class LoadsheetsFeedbackPage implements OnInit {

  loadsheet:any;
  completedStatus:boolean;

  imageResponse: any;
  options: any;
  Photo1:any;
  Photo2:any;
  Photo3:any;
  note:string = '';

  constructor(
    private imagePicker: ImagePicker,
    private router:Router,
    public general:GeneralService) { }

  ngOnInit() {
    if(this.general.allLoadsheets  && this.general.allLoadsheets != null) {
      this.loadsheet = _.filter(this.general.allLoadsheets, ['loadsheet_id', this.general.loadsheetData.loadsheet_id])[0];
      this.completedStatus = this.general.isLoadsheetCompleted;

    } else if(this.general.allDeliveries && this.general.allDeliveries != null) {
      this.loadsheet = this.general.detailedDelivery;
      this.completedStatus = this.general.isDeliveryCompleted;
    }

    if(this.completedStatus) this.note = this.loadsheet.note;
    console.log(this.loadsheet);
  }

  getImages() {
    if(!this.completedStatus) {
      this.options = {
        maximumImagesCount: 3,
        width: 400,
        height: 600,
        quality: 40,
        outputType: 1
      };

      this.imageResponse = [];
      this.imagePicker.getPictures(this.options).then((results) => {
        for (var i = 0; i < 3; i++) {
          this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
        }
      }, (err) => {
        alert(err);
      });

      this.Photo1 = this.imageResponse[0];
      this.Photo2 = this.imageResponse[1];
      this.Photo3 = this.imageResponse[2];
    }
  }

  next() {
    if(this.note == '') {
      this.general.presentAlertMsg('Please enter a note')

    } else {
      if(this.general.allLoadsheets  && this.general.allLoadsheets != null) {
        this.general.loadsheetData.verify_loaded.image_1 = this.Photo1;
        this.general.loadsheetData.verify_loaded.image_2 = this.Photo2;
        this.general.loadsheetData.verify_loaded.image_3 = this.Photo3;
        this.general.loadsheetData.verify_loaded.note = this.note;

      } else {
        this.general.loadsheetData.vehicle_reg_no = this.loadsheet.vehicle_reg_no;
        this.general.loadsheetData.verify_delivered.image_1 = this.Photo1;
        this.general.loadsheetData.verify_delivered.image_2 = this.Photo2;
        this.general.loadsheetData.verify_delivered.image_3 = this.Photo3;
        this.general.loadsheetData.verify_delivered.note = this.note;
      }
      this.router.navigate(['loadsheets/driver-details-loadsheet']);
    }
  }

}
