import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;
import { GeneralService } from 'src/app/general-service/general.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-construction-feedback',
  templateUrl: './construction-feedback.page.html',
  styleUrls: ['./construction-feedback.page.scss'],
})
export class ConstructionFeedbackPage implements OnInit {

  imageResponse: any;
  photo:SafeResourceUrl;
  Photo1:any; Photo1_src:any;
  Photo2:any; Photo2_src:any;
  Photo3:any; Photo3_src:any;
  note:string = '';

  constructor(
    private router:Router,
    private sanitizer: DomSanitizer,
    public general:GeneralService) { }

  ngOnInit() {
  }

  async takePicture(number:number) {
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

  next() {
    if(this.note == '') {
      this.general.presentAlertMsg('Please enter a note');
      return;
    }

    this.Photo1 ? this.general.loadsheetData.verify_construction.image_1 = this.Photo1 : 'null';
    this.Photo2 ? this.general.loadsheetData.verify_construction.image_2 = this.Photo2 : 'null';
    this.Photo3 ? this.general.loadsheetData.verify_construction.image_3 = this.Photo3 : 'null';
    this.general.loadsheetData.verify_construction.note = this.note;
    this.router.navigate(['construction/construction-beneficiary-details']);
  }

}
