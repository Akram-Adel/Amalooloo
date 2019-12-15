import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicSignaturePadModule, IonicsignaturepadComponent } from 'ionicsignaturepad';

import { DeliveryContractorDetailsPage } from './delivery-contractor-details.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryContractorDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonicSignaturePadModule,
    RouterModule.forChild(routes)
  ],
  exports: [IonicsignaturepadComponent],
  declarations: [DeliveryContractorDetailsPage]
})
export class DeliveryContractorDetailsPageModule {}
