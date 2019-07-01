import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

import { Events } from '@ionic/angular';
import { NavController, MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';

import * as moment from 'moment'; 
@Component({
  selector: 'app-appointment-checkout', 
  templateUrl: './appointment-checkout.page.html',
  styleUrls: ['./appointment-checkout.page.scss'],
})
export class AppointmentCheckoutPage implements OnInit {
  form: FormGroup;

  price: string = "0";

  final_data: any = {
    precio_extranjero: 0,
    precio_nacional: 0,
    nombre: '',
    fecha: '',
    medico_id: '',
    id_con: '',
    hor_con: ''
  };

  first_pay: boolean = true;
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              private events: Events,
              private database: DatabaseService,
              private storage: StorageService,
              public loadingController: LoadingController,
              private api: ApiService,
              private auth: AuthService,
              private payment: PaymentService) { }

  ngOnInit() {
    this.form = new FormGroup ({
      name: new FormControl (this.auth.user.fullname, Validators.required),
      phone_number: new FormControl (this.auth.user.country_dial_code + ' ' + this.auth.user.phone_number, Validators.required),
      nationality: new FormControl ('', Validators.required),
      email: new FormControl (this.auth.user.email, Validators.required),
      message: new FormControl (''),
      terms_conditions: new FormControl (false, Validators.compose([
        Validators.required,  
        Validators.pattern('true')
      ]))
    });

    this.storage.getParams ("params").then (async (data: any) => {
      const params = JSON.parse (data);

      this.final_data.fecha = params.fecha;
      this.final_data.nombre = params.nombre;
      this.final_data.precio_nacional = params.precio_nacional;
      this.final_data.precio_extranjero = params.precio_extranjero;
      this.final_data.medico_id = params.medico_id;
      this.final_data.id_con = params.id_con;
      this.final_data.hor_con = params.hor_con;

      const loading = await this.loadingController.create({
        message: 'Tu solicitud está en procesando... Espere un momento'
      });
    
      await loading.present();

      loading.dismiss ().then (() => {
        this.payment.initCulqi ();
      });

      this.onSelectChange ('peruano');
      this.events.subscribe('get_token', async (token: string) => {
        const loading = await this.loadingController.create({
          message: 'Tu solicitud está en procesando... Espere un momento'
        });
        
        await loading.present();

        const value = this.form.value;

        let data: any = {
          token: token,
          monto: parseInt(this.price) * 100,
          correo: value.email,
          moneda: 'PEN',
          des: "Pago de consulta medica - " + this.final_data.nombre,
          consulta: this.final_data.id_con,
          doctor: this.final_data.medico_id
        };

        this.api.procesarPago (data).subscribe ((response: any) => {
          console.log (response);

          if (response.estado === 1 && response.libre === 1 && response.respuesta.outcome.type === 'venta_exitosa') {
            const data_cita: any = {
              key: '',
              cliente_nombre: value.name,
              phone_number: value.phone_number,
              nationality: value.nationality,
              email: value.email,
              address: '',
              message: value.message,
              price: this.price,
              specialty_name: this.final_data.nombre,
              date: this.final_data.fecha,
              hour: this.final_data.hor_con
            };

            this.database.addAppointment (this.auth.user.id, data_cita).then (resonse_key => {
              const key = resonse_key;

              const data: any = {
                consulta: this.final_data.id_con,
                nacionalidad: value.nationality,
                email: value.email,
                message: value.message,
                id_tra: response.respuesta.id,
                phone: value.phone_number,
                name: value.name,
                especialidad: this.final_data.nombre,
                idioma: 'es'
              };

              this.api.checkoutapp (data).subscribe (async (response_checkout: any) => {
                console.log (response_checkout);
                loading.dismiss ();

                if (response_checkout.estado === 1) {
                  loading.dismiss ();
                  this.storage.setParams ('params', {
                    id: resonse_key
                  });
                  
                  this.navCtrl.navigateRoot ('appointment-details');
                } else {
                  loading.dismiss ();

                  const alert = await this.alertController.create({
                    header: '¡Error con la reserva!',
                    message: 'La cita fue pagada, pero por algún error no se pudo almacenar en la base de datos.',
                    buttons: ['OK']
                  });

                  await alert.present();
                }
              }, async error => {
                loading.dismiss ();

                const alert = await this.alertController.create({
                  header: '¡Error!',
                  message: 'Ocurrió un error en la reserva.',
                  buttons: ['OK']
                });

                await alert.present();
              });
            });
          }
        }, async error => {
          loading.dismiss ();
            
          const alert = await this.alertController.create({
            header: '¡Error!',
            message: 'Ocurrió un error en la reserva.',
            buttons: ['OK']
          });

          await alert.present();
        });
      });
    });
  }

  ionViewWillLeave () {
    this.events.unsubscribe('get_token', null);
  }

  onSelectChange (event: any) {
    if (event === "peruano") {
      this.price = this.final_data.precio_nacional;
    } else {
      this.price = this.final_data.precio_extranjero;
    }
  }

  async openCheckout () {
    const loading = await this.loadingController.create({
      message: 'Tu solicitud está en procesando... Espere un momento'
    });
    
    await loading.present();
    
    this.payment.cfgFormulario ("Pago por servicio", parseInt(this.price) * 100); // 300.000
                                                            // 9.99
    // Cuando la configuracion termina, llamo al metodo open () para abrir el formulario 
    loading.dismiss ().then (() => {
      this.payment.open ();
    });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }

  getFormatDate (fecha: string, hor_con: string) {
    return moment(fecha + ' ' + hor_con).format('LLLL');
  }
}
