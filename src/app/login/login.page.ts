import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

import { GeneralService } from '../general-service/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginForm:FormGroup;
  isConnecting = false;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private alertController: AlertController,
    public general:GeneralService) {

      this.loginForm = this.fb.group({
        // email: ['DumezweniMagugu@amalooloo.co.za', [Validators.required, Validators.pattern(this.general.emailPattern)]],
        // password: ['DumezweniMagugu', Validators.required],
        // email: ['mminelek1992@gmail.com', [Validators.required, Validators.pattern(this.general.emailPattern)]],
        email: ['hppmoloto@gmail.com', [Validators.required, Validators.pattern(this.general.emailPattern)]],
        // email: ['chontamo@gmail.com', [Validators.required, Validators.pattern(this.general.emailPattern)]],
        password: ['123qwe', Validators.required],

        // email: [null, [Validators.required, Validators.pattern(this.general.emailPattern)]],
        // password: [null, Validators.required],
        device_token: null,
        device_type: null
      });
    }

  ngOnInit() {
    this.getDeviceInfo();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Incorrect username or password ',
      buttons: ['OK']
    });

    await alert.present();
  }
  async getDeviceInfo() {
    const info = await Device.getInfo();
    this.loginForm.controls.device_type.setValue(info.platform);
    this.loginForm.controls.device_token.setValue(info.uuid);
  }


  login(form:any) {
    this.isConnecting = true;

    this.general.login(form).subscribe((data:any) => {
      this.isConnecting = false;
      if(data.status == '200') {
        this.general.userToken = data.result.token;
        this.general.userObject = data.result;
        this.router.navigate(['/dashboard']);
        console.log(data.result.token);

      } else {
        this.presentAlert();
      }
    });
  }

}
