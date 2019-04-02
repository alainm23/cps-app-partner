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
              private payment: PaymentService) { }

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
      message: 'Procesando informacion...'
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
          header: 'Exito!!!',
          message: response.mensaje,
          buttons: ['OK']
        });

        await alert.present();
      } else {
        const alert = await this.alertController.create({
          header: 'Error!!!',
          message: response.mensaje,
          buttons: ['OK']
        });

        await alert.present();
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

  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }
}
