import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoadsheetsFeedbackPage } from './loadsheets-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: LoadsheetsFeedbackPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoadsheetsFeedbackPage]
})
export class LoadsheetsFeedbackPageModule {}
