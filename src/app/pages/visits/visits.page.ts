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
  selector: 'app-visits',
  templateUrl: './visits.page.html',
  styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {
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
      subject: new FormControl ('', Validators.required),
      date: new FormControl ('', Validators.required),
      hour: new FormControl ('', Validators.required),
      contact_phone_number: new FormControl (this.auth.user.phone_number, Validators.required)
    });

    this.storage.getParams_2 ().then (data => {
      const params = JSON.parse (data);

      if (params.edit === true) {
        this.is_edit = true;

        this.database.getVisitsById (params.id).subscribe ((data: any) => {
          if (data) {
            this.form.controls ['subject'].setValue (data.subject);
            this.form.controls ['date'].setValue (data.date);
            this.form.controls ['hour'].setValue (data.hour);
            this.form.controls ['contact_phone_number'].setValue (data.contact_phone_number);
          }
        });
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
          subject: value.subject,
          date: value.date,
          hour: value.hour,
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
          await this.database.updateVisits (uid, data);
          const push_data = {
            titulo: 'Partner - Pedido de visita de representacion comercial',
            detalle: 'Un pedido de visita de representacion comercial fue solicitado',
            destino: 'visita',
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
          await this.database.addVisits (uid, data);
          const push_data = {
            titulo: 'Partner - Pedido de visita de representacion comercial',
            detalle: 'Un pedido de visita de representacion comercial fue solicitado',
            destino: 'visita',
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

  get_hours () {
    let list = [
      '09:00 - 10:00',
      '10:00 - 11:00',
      '11:00 - 12:00',
      '12:00 - 13:00',
      '13:00 - 14:00',
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:00 - 17:00']

    return list;
  }

  check_hour (date: string) {
    const value = this.form.value;

    const date_selected = new Date (value.date);
    const now = new Date ();
    
    if (date_selected > now) {
      return true;
    } else {
      let time = date.substring (0, 2); 

      if ((now.getHours () + 2) > +time) {
        return false;
      } else {
        return true;
      }
    }
  }
}
