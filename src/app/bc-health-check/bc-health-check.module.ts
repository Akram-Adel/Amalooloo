import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BcHealthCheckPage } from './bc-health-check.page';

const routes: Routes = [
  {
    path: '',
    component: BcHealthCheckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BcHealthCheckPage]
})
export class BcHealthCheckPageModule {}
