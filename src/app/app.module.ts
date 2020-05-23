import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
 
// Rest
import { HttpClientModule } from '@angular/common/http';

// Storage
import { IonicStorageModule } from '@ionic/storage';
import { AppAvailability } from '@ionic-native/app-availability/ngx';

// Geolocation
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

// OneSignal
import { OneSignal } from '@ionic-native/onesignal/ngx';

// Call
import { CallNumber } from '@ionic-native/call-number/ngx';

// Share
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Device } from '@ionic-native/device/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

// Modals
import { SelectCountriesPageModule } from './modals/select-countries/select-countries.module';
import { PaymentPageModule } from './modals/payment/payment.module';
import { SubcategoriasPageModule } from './modals/subcategorias/subcategorias.module';
import { MapSelectPageModule } from './modals/map-select/map-select.module'; 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      mode: 'md'
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'Clínica Peruano Suiza - Corporativo'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),

    //Modals
    SelectCountriesPageModule,
    PaymentPageModule,
    SubcategoriasPageModule,
    MapSelectPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    SocialSharing,
    AppAvailability,
    Geolocation,
    AndroidPermissions,
    LocationAccuracy,
    Device,
    AppVersion,
    CallNumber,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
