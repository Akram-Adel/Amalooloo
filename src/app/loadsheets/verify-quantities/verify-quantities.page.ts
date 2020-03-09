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
  allProducts:any;
  product:any;
  buttonText:string;

  constructor(
    private route:ActivatedRoute,
    private location: Location,
    public general:GeneralService) { }

  ngOnInit() {
    if(this.general.allLoadsheets  && this.general.allLoadsheets != null) {
      this.completedStatus = this.general.isLoadsheetCompleted;

    } else if(this.general.allDeliveries && this.general.allDeliveries != null) {
      this.completedStatus = this.general.isDeliveryCompleted;
    }

    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.general.getOrderDetails(this.orderId).subscribe((res:any) => {
      this.allProducts = res.result.products;

      this.allProducts.forEach(product => {

        for (let i = 0; i < product.components.length; i++) {
          product.components[i].math = 0;
        }

      });
      console.log('order details', this.allProducts);

      (this.completedStatus) ? this.buttonText = "BACK" : this.buttonText = "SAVE"
      this.isLoading = false;
    });
    this.general.loadsheetData.order_details[0].order_id = this.orderId;
  }

  actualChange(i:number, item:any, number:number) {
    let index = _.findIndex(this.allProducts[i].components, item);
    if(this.allProducts[i].components[index].quantity < number) this.general.presentAlertMsg('Actual quantity must be less than loaded quantify')

    if(this.general.allLoadsheets  && this.general.allLoadsheets != null) {
      this.allProducts[i].components[index].load_quantity = number;

    } else {
      this.allProducts[i].components[index].delivered_quantity = number;
    }

    this.allProducts[i].components[index].math = this.allProducts[i].components[index].quantity - number;
  }

  submit() {
    if(this.completedStatus) {
      this.location.back();

    } else {
      let text:string;
      if(this.general.allLoadsheets  && this.general.allLoadsheets != null) text = 'load_quantity';
      if(this.general.allDeliveries && this.general.allDeliveries != null) text = 'delivered_quantity';

      let isEmpty:number, isNull:number;

      for (let i = 0; i < this.allProducts.length; i++) {
        isEmpty = _.findIndex(this.allProducts[i].components, [text,0]);
        isNull = _.findIndex(this.allProducts[i].components, [text,'']);

        if(isEmpty != -1 || isNull != -1) {
          this.general.presentAlertMsg('Please fill all the quantities in '+this.allProducts[i].product_name);
          break;
        };
      }
      if(isEmpty != -1 || isNull != -1) return;

      let orderCompletedIndex = _.findIndex(this.general.allOrders, ['order_id', this.orderId]);
      this.general.allOrders[orderCompletedIndex].isRigth = true;

      this.general.loadsheetData.order_details[0].product_details = [];
      for (let i = 0; i < this.allProducts.length; i++) {
        let object = {product_id:null, components:null, component_details:null}

        object.product_id = this.allProducts[i].product_id;
        if(this.general.allLoadsheets  && this.general.allLoadsheets != null) {
          object.components = this.allProducts[i].components;
          delete object.component_details

        } else if(this.general.allDeliveries && this.general.allDeliveries != null) {
          object.component_details = this.allProducts[i].components;
          delete object.components;
        }

        this.general.loadsheetData.order_details[0].product_details.push(object);
      }
      this.location.back();
    }
  }

}
