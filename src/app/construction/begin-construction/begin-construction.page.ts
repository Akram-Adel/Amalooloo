import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;
const { Geolocation } = Plugins;
import { AlertController } from '@ionic/angular';
import { GeneralService } from '../../general-service/general.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';



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
    private imagePicker: ImagePicker,
    private router: Router,
    private alertController: AlertController,
    private general:GeneralService) {

      this.requestForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern(this.general.emailPattern)]],
        reason: ['', Validators.required],
        firstname: null,
        mobile: null,
        surname: null
      });
    }


  ngOnInit() {


    this.getCurrentPosition();
this.imagePicker.requestReadPermission();


  }


  async getCurrentPosition() {
    this.GPS = await Geolocation.getCurrentPosition();

  }


  async SubmitRequest(){


    // requestMaintenance(id,gps,image1,image2,image3,firstname,surname,mobile,email) {
let request = await this.general.requestMaintenance(this.general.constructionID,this.GPS,this.Photo1,this.Photo2,this.Photo3, this.requestForm.value.firstname,this.requestForm.value.surname,this.requestForm.value.mobile,this.requestForm.value.email).
subscribe((results:any)=>{

  if(results.status == '200') {
    this.presentAlert();
    this.router.navigate(['/dashboard']);


  } else {
    this.presentError();
    this.router.navigate(['/dashboard']);
  }
});



  }



  getImages() {
    this.options = {

      maximumImagesCount: 3,
      width: 400,
      height: 600,
      // quality of resized image, defaults to 100
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

    this.PhotosText="Photos Selected";

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Your request has been created!',
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Your request has not been created',
      buttons: ['OK']
    });

    await alert.present();
  }

}
