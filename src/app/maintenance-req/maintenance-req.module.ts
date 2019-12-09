import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MaintenanceReqPage } from './maintenance-req.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceReqPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MaintenanceReqPage]
})
export class MaintenanceReqPageModule {}
