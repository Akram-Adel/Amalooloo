import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { IonicSignaturePadModule, IonicsignaturepadComponent } from 'ionicsignaturepad';

import { DriverDetailsLoadsheetPage } from './driver-details-loadsheet.page';

const routes: Routes = [
  {
    path: '',
    component: DriverDetailsLoadsheetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonicSignaturePadModule,
    RouterModule.forChild(routes)
  ],
  exports: [IonicsignaturepadComponent],
  declarations: [DriverDetailsLoadsheetPage]
})
export class DriverDetailsLoadsheetPageModule {}
