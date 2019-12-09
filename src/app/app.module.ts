import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TipsPage } from './tips/tips.page'

import { IonicStorageModule } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicSignaturePadModule,IonicsignaturepadProvider } from 'ionicsignaturepad';

import { GeneralService } from './general-service/general.service';

@NgModule({
  declarations: [AppComponent, TipsPage],
  entryComponents: [TipsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicSignaturePadModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    HTTP,
    GeneralService,
    IonicsignaturepadProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
