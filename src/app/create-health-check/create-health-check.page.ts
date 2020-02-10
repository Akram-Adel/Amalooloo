import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;
import { GeneralService } from 'src/app/general-service/general.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-create-health-check',
  templateUrl: './create-health-check.page.html',
  styleUrls: ['./create-health-check.page.scss'],
})
export class CreateHealthCheckPage implements OnInit {

  constructionId:number;
  healthForm:FormGroup;
  isConnecting = false;

  imageResponse: any;
  photo:SafeResourceUrl;
  Photo1:any; Photo1_src:any;
  Photo2:any; Photo2_src:any;
  Photo3:any; Photo3_src:any;

  constructor(
    private sanitizer: DomSanitizer,
    private route:ActivatedRoute,
    private navCtrl: NavController,
    private fb:FormBuilder,
    public general:GeneralService) {

      this.healthForm = this.fb.group({
        toilet_type: [null, Validators.required],
        toilet_number: [null, Validators.required],
        toilet_grade: [null, Validators.required],
      });}

  ngOnInit() {
    this.constructionId = +this.route.snapshot.paramMap.get('id');
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

  submit() {
    if(this.isConnecting) return;
    if(!this.healthForm.valid) {
      this.general.presentAlertMsg('Please fill the apove data');
      return;
    }

    this.isConnecting = true;
    let data = this.healthForm.value;
      data.image_1 = this.Photo1;
      data.image_2 = this.Photo2;
      data.image_3 = this.Photo3;
      data.construction_id = this.constructionId;
    this.general.submitHealthCheck(data).subscribe((res:any) => {
      this.isConnecting = false;
      if(res.id) {
        this.general.presentAlertHandler(
          'Health Check has been successfully created!',
          () => {this.navCtrl.navigateRoot('maintenance-select')}
          )

      } else {
        this.general.presentAlertMsg('Something went wrong!!');
      }

      console.log(res);
    });
  }

}
