import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GeneralService } from '../general-service/general.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-bc-scanner',
  templateUrl: './bc-scanner.page.html',
  styleUrls: ['./bc-scanner.page.scss'],
})
export class BcScannerPage implements OnInit {

  customerMode:boolean;
  isLoading = true;
  construction = [1];
  constructionID:number;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    public general:GeneralService) { }

  ngOnInit() {
    this.BCScanner().then(()=>{

      this.customerMode = this.general.customerMode;
      if(this.customerMode){


        this.router.navigate(['/customer-maintenance-req']);
        this.general.constructionID = this.constructionID;
      }

      if(!this.customerMode){

        this.router.navigate(['/construction/view-past-construction']);
        this.general.constructionID = this.constructionID;
      }

    });


  }


  async BCScanner() {
    this.barcodeScanner.scan({
      preferFrontCamera: false,


      prompt: "Scan the Smart QR Code on the toilet",
      resultDisplayDuration: 0,
      formats: "QR_CODE",
    }).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.constructionID = Number(barcodeData);
     }).catch(err => {
        console.log('Error', err);
     });
  }

  doRefresh(event:any) {
    this.isLoading = true;
    this.construction = [];

    setTimeout(() => {
      this.loadFakeConstruction();
      event.target.complete();
    }, 1000);
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

  loadFakeConstruction() {
    this.construction = [1]
    this.isLoading = false;
  }

}
