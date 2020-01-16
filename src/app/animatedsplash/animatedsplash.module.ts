import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { LottieModule } from 'ngx-lottie';
import { AnimatedsplashPage } from './animatedsplash.page';

const routes: Routes = [
  {
    path: '',
    component: AnimatedsplashPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnimatedsplashPage]
})
export class AnimatedsplashPageModule {}
