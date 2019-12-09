import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerifyDeliveries2Page } from './verify-deliveries2.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyDeliveries2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerifyDeliveries2Page]
})
export class VerifyDeliveries2PageModule {}
