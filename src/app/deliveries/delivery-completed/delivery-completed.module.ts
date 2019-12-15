import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeliveryCompletedPage } from './delivery-completed.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryCompletedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeliveryCompletedPage]
})
export class DeliveryCompletedPageModule {}
