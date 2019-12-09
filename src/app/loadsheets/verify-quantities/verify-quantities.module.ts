import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerifyQuantitiesPage } from './verify-quantities.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyQuantitiesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerifyQuantitiesPage]
})
export class VerifyQuantitiesPageModule {}
