import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Device, Camera } = Plugins;
import { GeneralService } from '../general-service/general.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  photo:SafeResourceUrl;
  profileForm:FormGroup;
  isConnecting = false;

  constructor(
    private fb:FormBuilder,
    private alertController: AlertController,
    private sanitizer: DomSanitizer,
    private router: Router,
    public general:GeneralService) {

    this.profileForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      emailId: [null, [Validators.required, Validators.pattern(this.general.emailPattern)]],
      idNo: [null, Validators.required],
      designation: [null, Validators.required],
      contactNo: [null, [Validators.required, Validators.minLength(9)]],
      device_token: null,
      device_type: null
    })
  }

  ngOnInit() {
    this.loadProfile();
    this.getDeviceInfo();
  }


  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let rePassword = group.get('rePassword').value;

    return pass === rePassword ? null : { notSame: true }
  }
  async getDeviceInfo() {
    const info = await Device.getInfo();
    this.profileForm.controls.device_type.setValue(info.platform);
    this.profileForm.controls.device_token.setValue(info.uuid);
  }
  loadProfile() {
    let profile = this.general.userObject,
      profileControls = this.profileForm.controls;

    profileControls.firstName.setValue(profile.first_name);
    profileControls.lastName.setValue(profile.last_name);
    profileControls.emailId.setValue(profile.email_id);
    profileControls.idNo.setValue(profile.id_number);
    profileControls.designation.setValue(profile.designation);
    profileControls.contactNo.setValue(profile.contact_no);
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
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Profile Updated Successfully',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.router.navigate(['/dashboard']);
        }
      }]
    });

    await alert.present();
  }


  updateProfile(form:any) {
    this.isConnecting = true;

    this.general.updateProfile(form).subscribe((data:any) => {
      this.isConnecting = false;
      console.log(data);
      if(data.status == '200') {
        this.presentAlertConfirm();
      } else {
        this.general.presentAlertMsg(data.message);
      }
    })
  }

}
