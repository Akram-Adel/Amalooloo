import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StartNewLoadsheetsPage } from './start-new-loadsheets.page';

const routes: Routes = [
  {
    path: '',
    component: StartNewLoadsheetsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StartNewLoadsheetsPage]
})
export class StartNewLoadsheetsPageModule {}
