import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NativeHttpModule, NativeHttpBackend, NativeHttpFallback } from 'ionic-native-http-connection-backend';
import { AppComponent } from './app.component';
import { TipsPage } from './tips/tips.page'
import { HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { IonicSignaturePadModule,IonicsignaturepadProvider } from 'ionicsignaturepad';
import { Platform } from '@ionic/angular';
import { GeneralService } from './general-service/general.service';
import { LottieModule } from 'ngx-lottie';
import { TipsPageModule } from "../app/tips/tips.module";
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    NativeHttpModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TipsPageModule,
    IonicSignaturePadModule,
    [LottieModule.forRoot({ player: playerFactory })]
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    {provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    HTTP,
    LaunchNavigator,
    GeneralService,
    IonicsignaturepadProvider
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}
