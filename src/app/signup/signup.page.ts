import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Device, Camera } = Plugins;
import { GeneralService } from '../general-service/general.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  photo:SafeResourceUrl;
  signupForm:FormGroup;
  isCustomer = false;
  isConnecting = false;

  constructor(
    private fb:FormBuilder,
    private alertController: AlertController,
    private sanitizer: DomSanitizer,
    private router: Router,
    public menuCtrl: MenuController,
    public general:GeneralService) {

    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      emailId: [null, [Validators.required, Validators.pattern(this.general.emailPattern)]],
      idNo: [null, Validators.required],
      designation: [null],
      contactNo: [null, [Validators.required, Validators.minLength(9)]],
      password: [null, Validators.required],
      rePassword: [null, Validators.required],
      device_token: null,
      device_type: null
    }, {validators: this.checkPasswords})
  }

  ngOnInit() {
    this.isCustomer = this.general.customerMode;
    this.getDeviceInfo();
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }


  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let rePassword = group.get('rePassword').value;

    return pass === rePassword ? null : { notSame: true }
  }
  async getDeviceInfo() {
    const info = await Device.getInfo();
    this.signupForm.controls.device_type.setValue(info.platform);
    this.signupForm.controls.device_token.setValue(info.uuid);
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'User Registered Successfully',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.router.navigate(['/login']);
        }
      }]
    });

    await alert.present();
  }
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
            correctOrientation:false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    console.log(this.photo);
  }


  signup(form:any) {

    if(this.photo ==""){

     
        this.general.presentAlertMsg('Please add a photo')
  
    

    }
    this.isConnecting = true;

    this.general.register(form).subscribe((data:any) => {
      this.isConnecting = false;
      if(data.status == '200') {
        this.presentAlertConfirm();
      } else {
        this.general.presentAlertMsg(data.message);
      }
    })
  }

}
