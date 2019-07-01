import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

import { Events } from '@ionic/angular';
import { NavController, Platform, MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';

import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage implements OnInit {
  form: FormGroup;
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              private events: Events,
              private database: DatabaseService,
              private storage: StorageService,
              public loadingController: LoadingController,
              private api: ApiService,
              private auth: AuthService,
              private appAvailability: AppAvailability,
              private platform: Platform,
              private payment: PaymentService,
              private callNumber: CallNumber,
              private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.form = new FormGroup ({
      fullname: new FormControl ('', Validators.required),
      email: new FormControl ('', [Validators.required, Validators.email]),
      phone_number: new FormControl ('', [
                                           Validators.required, 
                                           Validators.minLength (9), 
                                           Validators.maxLength (9)]),
      message: new FormControl ('', Validators.required)
    });
  }

  async submit () {
    const loading = await this.loadingController.create({
      message: 'Tu solicitud está en procesando... Espere un momento'
    });
    
    await loading.present();

    const value = this.form.value;

    let data: any = {
      idioma: 'es',
      nombres: value.fullname,
      email: value.email,
      telefono: value.phone_number,
      mensaje:value.message
    }

    this.api.sendMessage (data).subscribe (async (response: any) => {
      if (response.estado === 1) {
        const alert = await this.alertController.create({
          header: 'Mensaje enviado exitosamemnte',
          message: response.mensaje,
          buttons: ['OK']
        });

        await alert.present();

        this.form.controls ['fullname'].setValue ('');
        this.form.controls ['phone_number'].setValue ('');
        this.form.controls ['email'].setValue ('');
        this.form.controls ['message'].setValue ('');
      } else {
        const alert = await this.alertController.create({
          header: '¡Error!',
          message: response.mensaje,
          buttons: ['OK']
        });

        await alert.present();

        this.form.controls ['fullname'].setValue ('');
        this.form.controls ['phone_number'].setValue ('');
        this.form.controls ['email'].setValue ('');
        this.form.controls ['message'].setValue ('');
      }

      loading.dismiss ();
    }, error => {
      loading.dismiss ();
      console.log (error)
    });
  }

  goSendAmbulance () {
    this.navCtrl.navigateForward ('ambulance');
  }

  callNow () {
    this.callNumber.callNumber("+51989316622", true)
      .then(res => {
        console.log('Launched dialer!', res)
      })
      .catch(err => {
        console.log('Error launching dialer', err)
      });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }

  chatWhatsapp () {
    this.socialSharing.shareViaWhatsAppToReceiver ('+51989316622', '')
      .then (() => {

      })
      .catch (async error => {
        const alert = await this.alertController.create({
          header: 'Aplicacion no encontrada!!!',
          message: 'Instale WhatsApp Messenger',
          buttons: ['OK']
        });

        await alert.present();
      });
  }

  sendSMS () {
    this.socialSharing.shareViaSMS ('', '+51989316622')
      .then (() => {

      })
      .catch (error => {
        console.log ('SMS error', error);
      });
  }

  chatMessenger () {
    let app;

    if (this.platform.is('ios')) {
      app = 'messenger://';
    } else if (this.platform.is('android')) {
      app = 'com.facebook.orca';
    }

    this.appAvailability.check(app).then ( (yes: boolean) => {
        location.href = "https://www.messenger.com/t/clinica.peruanosuiza";
      }, async (no: boolean) => {
        const alert = await this.alertController.create({
          header: 'Aplicacion no encontrada!!!',
          message: 'Instale Facebook Messenger',
          buttons: ['OK']
        });

        await alert.present();
      }
    );
  }
}
