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
  selector: 'app-occupational-exam',
  templateUrl: './occupational-exam.page.html',
  styleUrls: ['./occupational-exam.page.scss'],
})
export class OccupationalExamPage implements OnInit {
  is_edit: boolean = false;
  form: FormGroup;
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              private events: Events,
              private database: DatabaseService,
              public auth: AuthService,
              private api: ApiService,
              private storage: StorageService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup ({
      contact_phone_number: new FormControl (this.auth.user.phone_number, Validators.required),
      cantidad: new FormControl (null, Validators.required)
    });

    this.storage.getParams_2 ().then (data => {
      const params = JSON.parse (data);

      if (params.edit === true) {
        this.is_edit = true;

        this.database.getOccupationalExamById (params.id).subscribe ((data: any) => {
          if (data) {
            this.form.controls ['date'].setValue (data.date);
            this.form.controls ['hour'].setValue (data.hour);
            this.form.controls ['contact_phone_number'].setValue (data.contact_phone_number);
            this.form.controls ['cantidad'].setValue (data.cantidad);
          }
        });
      } else {
        this.is_edit = false;
      }
    });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }

  async submit () {
    const loading = await this.loadingController.create({
      message: 'Tu solicitud está en procesando... espere un momento'
    });
            
    await loading.present();

    this.storage.getValue ('uid').then (async (uid) => {
      this.storage.getValue ('token_id').then (async (token_id) => {
        const value = this.form.value;

        const data: any = {
          id: uid,
          token_id: token_id,
          cantidad: value.cantidad,
          contact_phone_number: value.contact_phone_number,
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
        };
              
        if (this.is_edit) {
          await this.database.updateOccupationalExam (uid, data);
          let push_data = {
              titulo: 'Partner - Pedido de examen ocupacional',
              detalle: 'Un pedido de examen ocupacional fue solicitado',
              destino: 'examen',
              mode: 'tags',
              clave: uid,
              tokens: 'Administrador'
            };

            this.api.pushNotification (push_data).subscribe (response => {
              console.log ("Notificacion Enviada...", response);
              loading.dismiss ();
              this.goHome ();
            }, error => {
              console.log ("Notificacion Error...", error);
              loading.dismiss ();
              this.goHome ();
            });
        } else {
          await this.database.addOccupationalExam (uid, data);
          let push_data = {
              titulo: 'Partner - Pedido de examen ocupacional',
              detalle: 'Un pedido de examen ocupacional fue solicitado',
              destino: 'examen',
              mode: 'tags',
              clave: uid,
              tokens: 'Administrador'
            };

            this.api.pushNotification (push_data).subscribe (response => {
              console.log ("Notificacion Enviada...", response);
              loading.dismiss ();
              this.goHome ();
            }, error => {
              console.log ("Notificacion Error...", error);
              loading.dismiss ();
              this.goHome ();
            });
        } 
      }); 
    });
  }
}
