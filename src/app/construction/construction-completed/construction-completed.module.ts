import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConstructionCompletedPage } from './construction-completed.page';

const routes: Routes = [
  {
    path: '',
    component: ConstructionCompletedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConstructionCompletedPage]
})
export class ConstructionCompletedPageModule {}
