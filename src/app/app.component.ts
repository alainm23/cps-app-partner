import { Component } from '@angular/core';

import { NavController, MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth.service';
import { DatabaseService } from './services/database.service';
import { StorageService } from './services/storage.service';
import { AppVersion } from '@ionic-native/app-version/ngx';

// OneSignal
import { OneSignal } from '@ionic-native/onesignal/ngx';

import * as moment from 'moment'; 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private oneSignal: OneSignal,
    private auth: AuthService,
    public alertController: AlertController,
    private database: DatabaseService,
    private socialSharing: SocialSharing,
    private device: Device,
    private appVersion: AppVersion,
    private storage: StorageService,
    public toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.initNotification ();

      if (this.platform.is('android')) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#000000');
      }

      moment.locale('es');
    });
  }

  initNotification () {
    this.oneSignal.startInit('f62ec6a9-740d-4840-9149-bf759347ce60', '727960214488');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
    this.oneSignal.handleNotificationOpened().subscribe(async (jsonData: any) => {
      const clave = jsonData.notification.payload.additionalData.clave;
      const destino: any = JSON.parse (jsonData.notification.payload.additionalData.destino);

      if (destino.page === 'ambulancia') {
        if (destino.state === 'canceled') {
          const alert = await this.alertController.create({
            header: jsonData.notification.payload.title,
            message: jsonData.notification.payload.body,
            buttons: ['OK']
          });

          await alert.present();
        } else {
          this.storage.setParams ('params', {
            id: clave
          });

          this.navCtrl.navigateForward ('ambulance-check');
        }
      } else if (destino.page === 'oxigeno') {
        if (destino.state === 'approved') {
          this.storage.setParams_v2 ({
            id: clave,
            state: 'created'
          });

          this.navCtrl.navigateForward ('oxygen-recharge-check');
        }
      } else if (destino.page === 'materia') {
        if (destino.state === 'approved') {
          this.storage.setParams_v2 ({
            id: clave,
            state: 'created'
          });

          this.navCtrl.navigateForward ('ads-material-check');
        }
      } else if (destino.page === 'capacitacion') {
        if (destino.state === 'approved') {
          this.storage.setParams_v2 ({
            id: clave,
            state: 'created'
          });

          this.navCtrl.navigateForward ('trainings-check');
        }
      } else if (destino.page === 'visita') {
        if (destino.state === 'approved') {
          this.storage.setParams_v2 ({
            id: clave,
            state: 'created'
          });

          this.navCtrl.navigateForward ('visits-check');
        }
      } else if (destino.page === 'botiquin') {
        if (destino.state === 'approved') {
          this.storage.setParams_v2 ({
            id: clave,
            state: 'created'
          });

          this.navCtrl.navigateForward ('medical-kit-check');
        }
      } else if (destino.page === 'examen') {
        if (destino.state === 'approved') {
          this.storage.setParams_v2 ({
            id: clave,
            state: 'created'
          });

          this.navCtrl.navigateForward ('occupational-exam-check');
        }
      }
    });

    this.oneSignal.handleNotificationReceived().subscribe(async (jsonData: any) => {
      console.log (jsonData);
      const clave = jsonData.payload.additionalData.clave;
      const destino: any = JSON.parse (jsonData.payload.additionalData.destino);

      if (destino.page === 'ambulancia') {
        if (destino.state === 'canceled') {
          const alert = await this.alertController.create({
            header: jsonData.payload.title,
            message: jsonData.payload.body,
            buttons: ['OK']
          });

          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: jsonData.payload.title,
            message: jsonData.payload.body,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: (blah) => {

                }
              }, {
                text: 'Ver pedido',
                handler: () => {
                  this.storage.setParams ('params', {
                    id: clave
                  });  

                  this.navCtrl.navigateForward ('ambulance-check');
                }
              }
            ]
          });

          await alert.present();
        }
      } else if (destino.page === 'oxigeno') {
        if (destino.state === 'approved') {
          const alert = await this.alertController.create({
            header: jsonData.payload.title,
            message: jsonData.payload.body,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: (blah) => {

                }
              }, {
                text: 'Ver pedido',
                handler: () => {
                  this.storage.setParams_v2 ({
                    id: clave,
                    state: 'created'
                  });

                  this.navCtrl.navigateForward ('oxygen-recharge-check');
                }
              }
            ]
          });

          await alert.present();
        }
      } else if (destino.page === 'materia') {
        if (destino.state === 'approved') {
          const alert = await this.alertController.create({
            header: jsonData.payload.title,
            message: jsonData.payload.body,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: (blah) => {

                }
              }, {
                text: 'Ver pedido',
                handler: () => {
                  this.storage.setParams_v2 ({
                    id: clave,
                    state: 'created'
                  });

                  this.navCtrl.navigateForward ('ads-material-check');
                }
              }
            ]
          });

          await alert.present();
        }
      } else if (destino.page === 'capacitacion') {
        if (destino.state === 'approved') {
          const alert = await this.alertController.create({
            header: jsonData.payload.title,
            message: jsonData.payload.body,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: (blah) => {

                }
              }, {
                text: 'Ver pedido',
                handler: () => {
                  this.storage.setParams_v2 ({
                    id: clave,
                    state: 'created'
                  });

                  this.navCtrl.navigateForward ('trainings-check');
                }
              }
            ]
          });

          await alert.present();
        }
      } else if (destino.page === 'visita') {
        if (destino.state === 'approved') {
          const alert = await this.alertController.create({
            header: jsonData.payload.title,
            message: jsonData.payload.body,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: (blah) => {

                }
              }, {
                text: 'Ver pedido',
                handler: () => {
                  this.storage.setParams_v2 ({
                    id: clave,
                    state: 'created'
                  });

                  this.navCtrl.navigateForward ('visits-check');
                }
              }
            ]
          });

          await alert.present();
        }
      } else if (destino.page === 'botiquin') {
        if (destino.state === 'approved') {
          const alert = await this.alertController.create({
            header: jsonData.payload.title,
            message: jsonData.payload.body,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: (blah) => {

                }
              }, {
                text: 'Ver pedido',
                handler: () => {
                  this.storage.setParams_v2 ({
                    id: clave,
                    state: 'created'
                  });

                  this.navCtrl.navigateForward ('medical-kit-check');
                }
              }
            ]
          });

          await alert.present();
        }
      } else if (destino.page === 'examen') {
        if (destino.state === 'approved') {
          const alert = await this.alertController.create({
            header: jsonData.payload.title,
            message: jsonData.payload.body,
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: (blah) => {

                }
              }, {
                text: 'Ver pedido',
                handler: () => {
                  this.storage.setParams_v2 ({
                    id: clave,
                    state: 'created'
                  });

                  this.navCtrl.navigateForward ('occupational-exam-check');
                }
              }
            ]
          });

          await alert.present();
        }
      }
    });

    this.oneSignal.endInit();

    this.auth.is_logged ().subscribe (async (user: any) => {
      this.oneSignal.getIds ().then (oS => {
        this.storage.setValue ("token_id", oS.userId)
        if (user) {
          this.database.updateToken (user.uid, oS.userId);
        }
      });
    });

    this.oneSignal.getTags ().then (data => {
      console.log (data);
    });

    this.oneSignal.sendTag ("Partners", "true");
  }

  goAppointmentListPage () {
    this.navCtrl.navigateForward ('appointment-list');
  }

  goOrders () {
    this.navCtrl.navigateForward ('orders');
  }

  salir () {
    this.auth.signOut ();
  }

  reportIssue () {
    this.appVersion.getVersionNumber ().then (app_version => {
      const body: string = '- Describe el error<br>' + 
                            'Una descripción clara y concisa de lo que es el error.<br><br>' +
                            '- Reproducir<br>' + 
                            '1. Ir a "..."<br>' +
                            '2. Haga clic en "..."<br>' +
                            '3. Desplácese hacia abajo hasta "..."<br>' +
                            '4. Ver error<br><br>' +
                            '- Mensaje adicional<br>' +
                            'Agregue cualquier otro mensaje sobre el problema aquí.<br><br>' + 
                            '- Información técnica<br>' +
                            'Modelo de dispositivo: ' + this.device.model + '<br>' +
                            'Versión: ' + this.device.version + '<br>' +
                            'Version de aplicacion: ' + app_version + '<br>';

      let subject: string = "Informe de error";
      
      this.socialSharing.shareViaEmail (body, subject, ['puntoproapp@gmail.com'])
        .then(() => {
          // OK
        }).catch(() => {
        // Error!
        });
    });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }
}
