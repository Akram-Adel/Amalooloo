import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import * as _ from 'lodash';

import { GeneralService } from 'src/app/general-service/general.service';

@Component({
  selector: 'app-verify-quantities',
  templateUrl: './verify-quantities.page.html',
  styleUrls: ['./verify-quantities.page.scss'],
})
export class VerifyQuantitiesPage implements OnInit {

  isLoading = true;
  orderId:number;
  product:any;

  constructor(
    private route:ActivatedRoute,
    private location: Location,
    private general:GeneralService) { }

  ngOnInit() {
    if(this.general.allOrders.length == 0) {
      this.general.presentAlertHandler('This session has expired', () => {this.location.back();});
    }

    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.general.getOrderDetails(this.orderId).subscribe((res:any) => {
      this.product = res.result.products[0];

      for (let i = 0; i < this.product.components.length; i++) {
        this.product.components[i].math = 0;
      }

      this.isLoading = false;

      console.log(this.product);
    });
    this.general.loadsheetData.order_details.order_id = this.orderId;
  }

  actualChange(item:any, number:number) {
    let index = _.findIndex(this.product.components, item);
    if(this.product.components[index].quantity < number) this.general.presentAlertMsg('Actual quantity must be less than loaded quantify')
    this.product.components[index].load_quantity = number;
    this.product.components[index].math = this.product.components[index].quantity - number;
  }

  save() {
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
