import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPastConstructionPage } from './view-past-construction.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPastConstructionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewPastConstructionPage]
})
export class ViewPastConstructionPageModule {}
