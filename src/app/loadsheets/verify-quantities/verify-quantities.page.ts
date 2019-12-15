import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import * as _ from 'lodash';

import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-verify-quantities',
  templateUrl: './verify-quantities.page.html',
  styleUrls: ['./verify-quantities.page.scss'],
})
export class VerifyQuantitiesPage implements OnInit {

  isLoading = true;
  completedStatus:boolean;
  orderId:number;
  product:any;
  buttonText:string;

  constructor(
    private route:ActivatedRoute,
    private location: Location,
    private general:GeneralService) { }

  ngOnInit() {
    if(this.general.allLoadsheets  && this.general.allLoadsheets != null) {
      this.completedStatus = this.general.isLoadsheetCompleted;

    } else if(this.general.allDeliveries && this.general.allDeliveries != null) {
      this.completedStatus = this.general.isDeliveryCompleted;
    }

    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.general.getOrderDetails(this.orderId).subscribe((res:any) => {
      this.product = res.result.products[0];
      console.log(this.product);

      for (let i = 0; i < this.product.components.length; i++) {
        this.product.components[i].math = 0;
      }

      (this.completedStatus) ? this.buttonText = "BACK" : this.buttonText = "SAVE"
      this.isLoading = false;
    });
    this.general.loadsheetData.order_details.order_id = this.orderId;
  }

  actualChange(item:any, number:number) {
    let index = _.findIndex(this.product.components, item);
    if(this.product.components[index].quantity < number) this.general.presentAlertMsg('Actual quantity must be less than loaded quantify')

    if(this.general.allLoadsheets  && this.general.allLoadsheets != null) {
      this.product.components[index].load_quantity = number;

    } else {
      this.product.components[index].delivered_quantity = number;
    }

    this.product.components[index].math = this.product.components[index].quantity - number;
  }

  submit() {
    if(this.completedStatus) {
      this.location.back();

    } else {
      let isEmpty = _.findIndex(this.product.components, ['load_quantity',0]),
      isNull = _.findIndex(this.product.components, ['load_quantity','']);
      if(isEmpty != -1 || isNull != -1) {
        this.general.presentAlertMsg('Please fill all the quantities');
        return;
      };

      let orderCompletedIndex = _.findIndex(this.general.allOrders, ['order_id', this.orderId]);
      this.general.allOrders[orderCompletedIndex].isRigth = true;
      this.general.allOrders[orderCompletedIndex].components = this.product.components;

      this.general.loadsheetData.order_details.product_details.product_id = this.product.product_id;
      this.general.loadsheetData.order_details.product_details.components = this.product.components;
      this.location.back();
    }
  }

}
