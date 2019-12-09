import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-construction-feedback',
  templateUrl: './construction-feedback.page.html',
  styleUrls: ['./construction-feedback.page.scss'],
})
export class ConstructionFeedbackPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Construction request has been sent successfully',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.router.navigate(['/dashboard']);
        }
      }]
    });

    await alert.present();
  }

}
