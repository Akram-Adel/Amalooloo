import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TipsPage } from './tips.page';

const routes: Routes = [
  {
    path: '',
    component: TipsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [TipsPage],
  entryComponents: [TipsPage],
  declarations: [TipsPage]
})
export class TipsPageModule {}
