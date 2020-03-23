import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators} from "@angular/forms";

import { Events } from '@ionic/angular';
import { NavController, MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.page.html',
  styleUrls: ['./appointment-details.page.scss'],
})
export class AppointmentDetailsPage implements OnInit {
  appointment: any = {
    cliente_nombre: '',
    phone_number: '',
    nationality: '',
    email: '',
    address: '',
    message: '',
    price: '',
    specialty_name: '',
    date: '',
    hour: ''
  };
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              private events: Events,
              private database: DatabaseService,
              private storage: StorageService,
              public loadingController: LoadingController,
              private api: ApiService,
              private auth: AuthService,
              private payment: PaymentService) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Tu solicitud está en procesando... Espere un momento'
    });
    
    await loading.present();

    this.storage.getParams ("params").then (async (data: any) => {
      const params = JSON.parse (data);

      this.database.getAppointmentByKey (params.id).subscribe ((response: any) => {
        this.appointment.cliente_nombre = response.cliente_nombre;
        this.appointment.phone_number = response.phone_number;
        this.appointment.nationality = response.nationality;
        this.appointment.email = response.email;
        this.appointment.address = response.address;
        this.appointment.message = response.message;
        this.appointment.price = response.price;
        this.appointment.specialty_name = response.specialty_name;
        this.appointment.date = response.date;
        this.appointment.hour = response.hour;

        loading.dismiss ();
      });
    });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }
}
