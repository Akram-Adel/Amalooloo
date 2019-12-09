import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StartNewDeliveriesPage } from './start-new-deliveries.page';

const routes: Routes = [
  {
    path: '',
    component: StartNewDeliveriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StartNewDeliveriesPage]
})
export class StartNewDeliveriesPageModule {}
