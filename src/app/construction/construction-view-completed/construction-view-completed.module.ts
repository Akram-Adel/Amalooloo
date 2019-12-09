import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConstructionViewCompletedPage } from './construction-view-completed.page';

const routes: Routes = [
  {
    path: '',
    component: ConstructionViewCompletedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConstructionViewCompletedPage]
})
export class ConstructionViewCompletedPageModule {}
