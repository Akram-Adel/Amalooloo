import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConstructionBetramEmpPage } from './construction-betram-emp.page';

const routes: Routes = [
  {
    path: '',
    component: ConstructionBetramEmpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConstructionBetramEmpPage]
})
export class ConstructionBetramEmpPageModule {}
