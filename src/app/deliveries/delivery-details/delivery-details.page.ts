import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import * as _ from 'lodash';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.page.html',
  styleUrls: ['./delivery-details.page.scss'],
})
export class DeliveryDetailsPage implements OnInit {

  sheetNo:string;
  loadsheet:any;
  buttonText = 'View Delivered Quantities';
  GPS:any;
  fixedReg:boolean;

  constructor(
    private route:ActivatedRoute,
    public general:GeneralService,
    public launchNavigator: LaunchNavigator) { }

  ngOnInit() {
    this.sheetNo = this.route.snapshot.paramMap.get('no');
    console.log( this.sheetNo);
    this.getCurrentPosition();
    this.general.detailedDelivery = null;
    this.loadDelivery();
  }
  async getCurrentPosition() {
    this.GPS = await Geolocation.getCurrentPosition();
    console.log("Current Position", this.GPS);
  }


  Navigate(){

    
   
    

    let options: LaunchNavigatorOptions = {
      start: ""+this.GPS.coords.latitude.toString()+","+this.GPS.coords.longitude.toString()+"",
    };
    
    this.launchNavigator.navigate([ this.general.navLat, this.general.navlong],options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );


  }


  updatereg(){
    if(this.loadsheet.vehicle_reg_no != '') {
      this.fixedReg = true;
      console.log(this.fixedReg);
      
    }
  }

  loadDelivery() {

    this.loadsheet = _.filter(this.general.allDeliveries, ['delivery_no', this.sheetNo])[0];
    console.log(this.loadsheet);
    
    this.general.getDeliveryDetail(this.loadsheet.id).subscribe((res:any) => this.general.detailedDelivery = res.result[0])
    if(this.loadsheet.delivery_status != "completed") {
      this.general.isDeliveryCompleted = false;
      this.general.loadsheetData.delivery_id = this.loadsheet.id;
      this.buttonText = 'Add Delivered Quantities'
            if(this.loadsheet.vehicle_reg_no == null) {
      this.general.presentAlertMsg('Please enter a vehicle Registration Number');
      this.fixedReg = false;
    }

    } else {this.general.isDeliveryCompleted = true}

    console.log(this.loadsheet);
  }

}
