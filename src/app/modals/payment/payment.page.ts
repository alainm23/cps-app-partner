import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

import { Events } from '@ionic/angular';
import { NavController, MenuController, ModalController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  @Input () mount: number;
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              private events: Events,
              private database: DatabaseService,
              private storage: StorageService,
              public loadingController: LoadingController,
              private api: ApiService,
              private modalCtrl: ModalController,
              private auth: AuthService,
              private payment: PaymentService) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Éspere un momento...'
    });
    
    await loading.present();

    loading.dismiss ().then (() => {
      this.payment.initCulqi ()
    });


    this.events.subscribe('get_token', async (token) => {
      const loading = await this.loadingController.create({
        message: 'Hellooo'
      });
      
      await loading.present();

      console.log ("Token:" +  token);

      let data: any = {
        token: token,
        monto: this.mount,
        correo: this.auth.user.email,
        moneda: 'PEN',
        des: 'Pago por servicio de delivery - CPS'
      };

      this.api.procesarPago2 (data).subscribe (async (response: any) => {
          console.log (response);

          if (response.estado === 1) {
            if (response.respuesta.outcome.type === 'venta_exitosa') {
              loading.dismiss ();

              let item: any = {
                type: 'venta_exitosa',
                transaccion_id: response.respuesta.id,
                message: response.respuesta.outcome.user_message
              };

               this.modalCtrl.dismiss (item, 'response');
            } else {
              loading.dismiss ();

              let item: any = {
                type: 'venta_error',
                message: response.respuesta.outcome.user_message
              };

              this.modalCtrl.dismiss (item, 'response');
            }  
          } else {
            loading.dismiss ();

            let item: any = {
              type: 'venta_error',
              message: response.respuesta.outcome.user_message
            };

            this.modalCtrl.dismiss (item, 'response');
          } 
      }, async error => {
        loading.dismiss ();
        const confirm = await this.alertController.create({
          header: 'Error con el proceso de pago',
          message: 'Deseas intentarlo nuevamente?',
          buttons: [
            {
              text: 'No',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: 'Si',
              handler: () => {
                this.openCulqi ();
              }
            }
          ]
        });
        
        confirm.present();
      });
    });
  }

  closeModal() {
    let item: any = {
      type: 'salir'
    };

    this.modalCtrl.dismiss (item, 'response');
  }

  async openCulqi () {
    this.payment.cfgFormulario ("Pago por servicio", this.mount);

    const loading = await this.loadingController.create({
      message: 'Hellooo'
    });
    
    await loading.present();

    loading.dismiss ().then (async () => {
      await this.payment.open ();
    })
  }

  contraentrega () {
    let item: any = {
      type: 'contra_entrega'
    };

    this.modalCtrl.dismiss (item, 'response');
  }
}
