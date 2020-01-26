import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;
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
  photo:SafeResourceUrl;
  Photo1:any; Photo1_src:any;
  Photo2:any; Photo2_src:any;
  Photo3:any; Photo3_src:any;
  note:string = '';

  constructor(
    private sanitizer: DomSanitizer,
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

    if(this.completedStatus) {
      this.loadImages();
      this.note = this.loadsheet.note;
    };
    console.log(this.loadsheet);
  }

  async takePicture(number:number) {
    if(!this.completedStatus) {

      const image = await Camera.getPhoto({
        quality: 40,
        allowEditing: true,
        saveToGallery: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + image.base64String);
      console.log('image-Base64 ',image.base64String);

      switch (number) {
        case 1:
          this.Photo1 = image.base64String;
          this.Photo1_src = this.photo;
          break;

        case 2:
          this.Photo2 = image.base64String;
          this.Photo2_src = this.photo;
          break;

        case 3:
          this.Photo3 = image.base64String;
          this.Photo3_src = this.photo;
          break;

        default:
          this.Photo1 = image.base64String;
          this.Photo1_src = this.photo;
          break;
      }

    }
  }

  loadImages() {
    this.Photo1 = this.loadsheet.image_1;
    this.Photo1_src = this.general.Image_BASE_URL+this.Photo1;

    this.Photo2 = this.loadsheet.image_2;
    this.Photo2_src = this.general.Image_BASE_URL+this.Photo2;

    this.Photo3 = this.loadsheet.image_3;
    this.Photo3_src = this.general.Image_BASE_URL+this.Photo3;
  }


  next() {
    if(this.note == '') {
      this.general.presentAlertMsg('Please enter a note')

    } else {
      if(this.general.allLoadsheets  && this.general.allLoadsheets != null) {
        this.Photo1 ? this.general.loadsheetData.verify_loaded.image_1 = this.Photo1 : 'null';
        this.Photo2 ? this.general.loadsheetData.verify_loaded.image_2 = this.Photo2 : 'null';
        this.Photo3 ? this.general.loadsheetData.verify_loaded.image_3 = this.Photo3 : 'null';
        this.general.loadsheetData.verify_loaded.note = this.note;

      } else {
        this.general.loadsheetData.vehicle_reg_no = this.loadsheet.vehicle_reg_no;
        this.Photo1 ? this.general.loadsheetData.verify_delivered.image_1 = this.Photo1 : 'null';
        this.Photo2 ? this.general.loadsheetData.verify_delivered.image_2 = this.Photo2 : 'null';
        this.Photo3 ? this.general.loadsheetData.verify_delivered.image_3 = this.Photo3 : 'null';
        this.general.loadsheetData.verify_delivered.note = this.note;
      }
      this.router.navigate(['loadsheets/driver-details-loadsheet']);
    }
  }

}
