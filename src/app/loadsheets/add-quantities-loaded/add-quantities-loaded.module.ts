import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddQuantitiesLoadedPage } from './add-quantities-loaded.page';

const routes: Routes = [
  {
    path: '',
    component: AddQuantitiesLoadedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddQuantitiesLoadedPage]
})
export class AddQuantitiesLoadedPageModule {}
