import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPastDeliveriesPage } from './view-past-deliveries.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPastDeliveriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewPastDeliveriesPage]
})
export class ViewPastDeliveriesPageModule {}
