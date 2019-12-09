import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConstructionBeneficiaryDetailsPage } from './construction-beneficiary-details.page';

const routes: Routes = [
  {
    path: '',
    component: ConstructionBeneficiaryDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConstructionBeneficiaryDetailsPage]
})
export class ConstructionBeneficiaryDetailsPageModule {}
