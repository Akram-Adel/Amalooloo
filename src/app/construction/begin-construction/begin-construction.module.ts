import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BeginConstructionPage } from './begin-construction.page';

const routes: Routes = [
  {
    path: '',
    component: BeginConstructionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BeginConstructionPage]
})
export class BeginConstructionPageModule {}
