import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general-service/general.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-bc-health-check',
  templateUrl: './bc-health-check.page.html',
  styleUrls: ['./bc-health-check.page.scss'],
})
export class BcHealthCheckPage implements OnInit {

  constructionID:number;

  constructor(
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    public general:GeneralService) { }

  ngOnInit() {
    this.BCScanner().then(()=>{

      this.router.navigate(['/create-health-check', this.constructionID]);

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
      if(barcodeData.cancelled == true){

        this.router.navigate(['/dashboard', this.constructionID]);


      }
      if(barcodeData.cancelled != true){


        this.constructionID = Number(barcodeData.text);
      }
    
     }).catch(err => {
        console.log('Error', err);
     });
  }

}
