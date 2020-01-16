import { Component, OnInit } from '@angular/core';
import {NavController, NavParams } from '@ionic/angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-animatedsplash',
  templateUrl: './animatedsplash.page.html',
  styleUrls: ['./animatedsplash.page.scss'],
})
export class AnimatedsplashPage implements OnInit {

  options: AnimationOptions = {
    path: '/assets/html/Amalooloo.json'

  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }



  constructor(public navCtrl: NavController,) {


   }







  ngOnInit() {
    setTimeout(() => {
      this.navCtrl.navigateRoot('mode-selection');
        }, 7500);
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.navCtrl.navigateRoot('mode-selection');
        }, 7500);
 
  }

}
