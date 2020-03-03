import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera, Geolocation } = Plugins;
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-customer-maintenance-req',
  templateUrl: './customer-maintenance-req.page.html',
  styleUrls: ['./customer-maintenance-req.page.scss'],
})
export class CustomerMaintenanceReqPage implements OnInit {

  isConnecting:boolean = false;

  GPS:any;
  photo:SafeResourceUrl;
  Photo1:any; Photo1_src:any;
  Photo2:any; Photo2_src:any;
  Photo3:any; Photo3_src:any;
  reasonForRequest:string;
  quote:string;

  constructor(
    private sanitizer: DomSanitizer,
    private router:Router,
    public general:GeneralService) { }

  ngOnInit() {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    this.GPS = await Geolocation.getCurrentPosition();
    console.log("Current Position", this.GPS);
  }

  async takePicture(number:number) {
    const image = await Camera.getPhoto({
      quality: 40,
      allowEditing: false,
      saveToGallery: false,
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


  Submit() {
    if(this.reasonForRequest == '') {
      this.general.presentAlertMsg('Please enter the request reason')

    } else {
      this.isConnecting = true;
      this.general.requestMaintenance(this.GPS, this.Photo1, this.Photo2, this.Photo3, this.reasonForRequest, this.quote).subscribe(res => {
        this.isConnecting = false;
        this.general.presentAlertHandler('Request maintenance sent', {});
        this.router.navigate(['/dashboard']);
        console.log('maintenance request result', res);
      })
    }
  }

}
