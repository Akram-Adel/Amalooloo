import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailDeliveriesPage } from './detail-deliveries.page';

const routes: Routes = [
  {
    path: '',
    component: DetailDeliveriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailDeliveriesPage]
})
export class DetailDeliveriesPageModule {}
