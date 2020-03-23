import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormControl, FormGroup, Validators} from "@angular/forms";

import { NavController, MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
// Ionic
import { ModalController } from '@ionic/angular'; 
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google: any;
import * as moment from 'moment';
import { Subscription } from 'rxjs';

import { PaymentPage } from '../../modals/payment/payment.page';

@Component({
  selector: 'app-home-nurse-check',
  templateUrl: './home-nurse-check.page.html',
  styleUrls: ['./home-nurse-check.page.scss'],
})
export class HomeNurseCheckPage implements OnInit {
home_injection: any;
  amount: number;

  observations: any;
  subscription_1: Subscription;
  subscription_2: Subscription;
  constructor(private modalCtrl: ModalController,
              public navCtrl: NavController,
              public alertController: AlertController,
              private database: DatabaseService,
              public auth: AuthService,
              public api: ApiService,
              private storage: StorageService,
              public loadingController: LoadingController,
              private geolocation: Geolocation) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Tu solicitud está en procesando... Espere un momento'
    });
    
    await loading.present();

    this.storage.getParams_2 ().then (data => {
      const params = JSON.parse (data);

      if (params.type === 'canceled') {
        this.subscription_1 = this.database.getHomePressureCanceladoByKey (params.id).subscribe (data => {
          this.home_injection = data;
          loading.dismiss ();
        });
      } else if (params.type === 'finalized') {
        this.subscription_1 = this.database.getHomePressureFinalizadosByKey (params.id).subscribe (data => {
          this.home_injection = data;
          loading.dismiss ();
        });
      } else {
        this.subscription_1 = this.database.getHomePressureByKey (params.id).subscribe ((data: any) => {
          this.home_injection = data;
          loading.dismiss ();
        });

        this.subscription_2 = this.database.getHomePressureObservations (params.id).subscribe ((data: any) => {
          if (data) {
            this.observations = data;
          }
        });
      }
    });
  }
  
  goHome () {
    this.navCtrl.navigateRoot ('home');
  }

   getFormatDate (date: string) {
    return moment(date).format('LL');
  }
  
  getFormatPrice (price: number) {
    return (price / 100).toString (); 
  }

  getRelativeTime (time: number) {
    let n = time / 60;
    n = ~~n;
    return n.toString ();
  }

  edit (id: string) {
    this.storage.setParams_v2 ({
      edit: true,
      id: this.home_injection.id
    });

    this.navCtrl.navigateForward ('home-nurse');
  }

  async cancel () {
    const confirm = await this.alertController.create({
      header: 'Esta seguro que desea cancelar',
      message: '',
      inputs: [
        {
          name: 'message',
          placeholder: 'Motivo'
        },
      ],
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Si',
          handler: async (data) => {
            const loading = await this.loadingController.create({
              message: 'Tu solicitud está en procesando... Espere un momento'
            });
            
            await loading.present();

            this.home_injection.is_checked = true;
            this.home_injection.state = "canceled";
            this.home_injection.who_canceled = "user";
            this.home_injection.why_canceled = data.message;
            this.home_injection.last_message = data.message;
            this.home_injection.canceled_date = new Date ().toISOString ();

            this.database.updateHomePressureCanceled (this.home_injection.id, this.home_injection, this.observations ).then ((response) => {
              loading.dismiss ();
              this.goHome ();
            });
          }
        }
      ]
    });
    confirm.present();
  }

  async presentActionSheet (mount: number) {
    const modal = await this.modalCtrl.create({
      component: PaymentPage,
      componentProps: { mount: mount },
      mode: 'ios',
    });

    modal.onDidDismiss ().then (async (response: any) => {
      console.log (response);

      if (response.role == 'response') {
        const loading = await this.loadingController.create({
          message: 'Tu solicitud está en procesando... Espere un momento'
        });
        
        await loading.present();

        if (response.data.type === 'contra_entrega') {
          await this.database.updateHomePressureContraEntrega (this.home_injection.id);
          loading.dismiss ();

          const alert = await this.alertController.create({
            header: 'Proceso exitoso!!!',
            message: response.data.message,
            buttons: ['OK']
          });

          alert.present();

          let push_data = {
            titulo: 'Pedido de doctor a domicilio',
            detalle: 'Un pedido de doctor a domicilio fue pagado',
            destino: 'doctor',
            mode: 'tags',
            clave: this.home_injection.id,
            tokens: 'Administrador'
          };

          this.api.pushNotification (push_data).subscribe (response => {
            console.log ("Notificacion Enviada...", response);
          }, error => {
            console.log ("Notificacion Error...", error);
          });
        } else if (response.data.type === 'venta_exitosa') {
          await this.database.updateHomePressureOnlinePaid (this.home_injection.id, response.data.transaccion_id);
          loading.dismiss ();

          const alert = await this.alertController.create({
            header: 'Proceso exitoso!!!',
            message: response.data.message,
            buttons: ['OK']
          });

          alert.present();

          let push_data = {
            titulo: 'Pedido de doctor a domicilio',
            detalle: 'Un pedido de doctor a domicilio fue pagado',
            destino: 'doctor',
            mode: 'tags',
            clave: this.home_injection.id,
            tokens: 'Administrador'
          };

          this.api.pushNotification (push_data).subscribe (response => {
            console.log ("Notificacion Enviada...", response);
          }, error => {
            console.log ("Notificacion Error...", error);
          });
        } else if (response.data.type === 'venta_error') {
          loading.dismiss ();
          
          console.log (response.data.message)

          const alert = await this.alertController.create({
            header: 'Error !!!',
            message: response.data.message,
            buttons: ['OK']
          });

          alert.present(); 
        } else if (response.data.type === 'error_api') {
          loading.dismiss ();

          console.log (response.data.message)

          const alert = await this.alertController.create({
            header: 'Error !!!',
            message: response.data.message,
            buttons: ['OK']
          });
        } else {
          loading.dismiss ();
        } 
      }
    });

    return await modal.present();
  }
}
