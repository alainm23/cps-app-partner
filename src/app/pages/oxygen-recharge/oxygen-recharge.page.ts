import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

import { Events } from '@ionic/angular';
import { NavController, MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-oxygen-recharge',
  templateUrl: './oxygen-recharge.page.html',
  styleUrls: ['./oxygen-recharge.page.scss'],
})
export class OxygenRechargePage implements OnInit {
  form: FormGroup;
  is_edit: boolean = false;
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              private events: Events,
              private database: DatabaseService,
              private auth: AuthService,
              private storage: StorageService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup ({
      oxygen_size: new FormControl ('small', Validators.required),
      time: new FormControl ('ahora', Validators.required)
    });

    this.storage.getParams_2 ().then (data => {
      const params = JSON.parse (data);

      if (params.edit === true) {
        this.is_edit = true;

        this.database.getOxygenRechargeById (params.id).subscribe ((data: any) => {
          if (data) {
            this.form.controls ["oxygen_size"].setValue (data.oxygen_size);
            this.form.controls ["time"].setValue (data.time);
          }
        });
      }
    });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }

  async submit () {
    let header;
    let message;
    if (this.is_edit) {
      header = "Editar pedido";
      message = "Esta seguro que quiere editar este pedido";
    } else {
      header = "Solicitar";
      message = "Esta seguro que quiere solicitar este pedido";
    }

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async () => {
            const value = this.form.value;
            
            const loading = await this.loadingController.create({
              message: 'Hellooo'
            });
            
            await loading.present();

            this.storage.getValue ('uid').then (async (uid) => {
              const data: any = {
                id: uid,
                oxygen_size: value.oxygen_size,
                time: value.time,
                created_date: new Date ().toISOString (),
                ruc: this.auth.user.ruc,
                user_phone_number: this.auth.user.phone_number,
                user_fullname: this.auth.user.fullname,
                user_email: this.auth.user.email,
                user_country_name: this.auth.user.country_name,
                user_country_dial_code: this.auth.user.country_dial_code,
                user_country_code: this.auth.user.country_code,
                user_logotipo: this.auth.user.logotipo,
                user_company_name: this.auth.user.company_name,
                user_address: this.auth.user.address,
                state: 'created',
                why_canceled: '',
                who_canceled: '',
                admi_id: '',
                admi_name: '',
                canceled_date: '',
                approved_date: '',
                finalized_date: ''
                /*
                price: 0,
                delivery_price: 0,
                delivery_time: 0,
                is_checked: false,  
                is_paid: false,
                is_sent: false,
                
                message: '',
                payment_type: '', //online, cash,
                
                who_canceled: '',
                who_canceled_name: '',
                canceled_date: '',
                arrived_date: '',
                approved_date: '',
                completed_date: '',
                
                tipo_comprobante: value.tipo_comprobante,
                */
              };
              
              if (this.is_edit) {
                await this.database.updateOxygenRecharge (uid, data);
                loading.dismiss ();
                this.goHome ();
              } else {
                await this.database.addOxygenRecharge (uid, data);
                loading.dismiss ();
                this.goHome ();
              }  
            });
          }
        }
      ]
    });

    await alert.present();
  }
}