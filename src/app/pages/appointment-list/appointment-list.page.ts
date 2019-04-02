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
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.page.html',
  styleUrls: ['./appointment-list.page.scss'],
})
export class AppointmentListPage implements OnInit {
  appointments: any;
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              private events: Events,
              private database: DatabaseService,
              private storage: StorageService,
              public loadingController: LoadingController,
              private api: ApiService,
              private auth: AuthService,
              private payment: PaymentService) { }

  async ngOnInit () {
    const loading = await this.loadingController.create({
      message: 'Hellooo'
    });
    
    await loading.present();

    this.storage.getValue ('uid').then (uid => {
      console.log (uid);

      this.database.getAppointmentsByUser (uid).subscribe (data => {
        this.appointments = data;

        console.log (data);
        loading.dismiss ();
      });
    });
  }

  ngOnDestroy () {

  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }

  goAppointmentDetailPage (key: string) {
    this.storage.setParams ('params', {
      id: key
    });
                  
    this.navCtrl.navigateForward ('appointment-details');
  }
}
