import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPastLoadsheetsPage } from './view-past-loadsheets.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPastLoadsheetsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewPastLoadsheetsPage]
})
export class ViewPastLoadsheetsPageModule {}
