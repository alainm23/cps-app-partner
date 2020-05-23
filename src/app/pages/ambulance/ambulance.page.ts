import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
  
import { Events } from '@ionic/angular';
import { NavController, MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service'; 
import { ApiService } from '../../services/api.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';  
import { CallNumber } from '@ionic-native/call-number/ngx';
declare var google: any;

// Ionic
import { ModalController } from '@ionic/angular';   

// Modals
import { SelectCountriesPage } from '../../modals/select-countries/select-countries.page';
import { MapSelectPage } from '../../modals/map-select/map-select.page';

@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.page.html',
  styleUrls: ['./ambulance.page.scss'],
})
export class AmbulancePage implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  form: FormGroup;

  latitude: number = 0;
  longitude: number = 0;
  
  pais_selected: any = {
    name: "Peru",
    dial_code: "+51",
    code: "PE"
  };

  editar_1: string;
  constructor(public navCtrl: NavController,
              private database: DatabaseService,
              private modalController: ModalController,
              private storage: StorageService,
              public loadingController: LoadingController,
              private api: ApiService,
              private auth: AuthService,
              private callNumber: CallNumber,
              private geolocation: Geolocation) { }

  ngOnInit() {
    this.form = new FormGroup({
      phone_number: new FormControl ('', [Validators.required]),
      address: new FormControl ("", [Validators.required]),
      latitude: new FormControl (0, [Validators.required]),
      longitude: new FormControl (0, [Validators.required])
    });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }
  
  async goConfirmAmbulance () {
    const loading = await this.loadingController.create({
      message: 'Procesando ...'
    });
    
    await loading.present();

    const value = this.form.value;

    this.storage.getValue ("uid").then (async (id: string) => {
      this.storage.getValue ("token_id").then (async token_id => {
        let data: any = {
          id: id,
          token_id: token_id,
          phone_number: value.phone_number,
          address: value.address,
          latitude: this.latitude,
          longitude: this.longitude,
          date: new Date ().toISOString (),
          ambulance_ori_lat: 0,
          ambulance_ori_lon: 0,
          who_canceled: '',// user, admi
          why_canceled: '',
          ambulance_id: '',
          driver_id: '',
          admi_id: '',
          admi_name: '',
          state: 'created', //created, approved, canceled, sent, finalized
          user_fullname: this.auth.user.fullname,
          user_email: this.auth.user.email,
          country_name: this.pais_selected.name,
          country_dial_code: this.pais_selected.dial_code,
          country_code: this.pais_selected.code,
          solicitante: 'partner'
        };

        await this.database.addSendAmbulance (data, data.id);

        let push_data = {
          titulo: 'Emergencia',
          detalle: 'Se solicito una ambulancia',
          destino: 'ambulance-check',
          mode: 'tags',
          clave: data.id,
          tokens: 'Administrador,Admision'
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
      });  
    });
  }

  async callNow () {
    const loading = await this.loadingController.create({
      message: 'Procesando ...'
    });

    loading.present ();
    
    this.callNumber.callNumber("+51989316622", true)
    .then(res => {
      loading.dismiss ();
    })
    .catch(err => {
      loading.dismiss ();
    });
  }

  getFlat () {
    return "https://www.countryflags.io/" + this.pais_selected.code + "/flat/24.png";
  }

  async select_code () {
    const modal = await this.modalCtrl.create({
      component: SelectCountriesPage,
      mode: 'ios',
    });

    modal.onDidDismiss ().then ((response: any) => {
      if (response.role == 'response') {
        this.pais_selected = response.data;
      }
    });

    return await modal.present();
  }

  async selectOrigen () {
    const value = this.form.value;

    const modal = await this.modalController.create({
      component: MapSelectPage,
      componentProps: {
        latitude: this.latitude,
        longitude: this.longitude,
        address: value.address
      }
    });

    modal.onDidDismiss ().then ((response: any) => {
      if (response.role === 'ok') {
        this.latitude = response.data.latitude;
        this.longitude = response.data.longitude;
        
        this.editar_1 = "(Editar)";

        this.form.controls ['latitude'].setValue (response.data.latitude);
        this.form.controls ['longitude'].setValue (response.data.longitude);
        this.form.controls ["address"].setValue (response.data.address);
      }
    });

    return await modal.present();

    // const value = this.form.value;

    // let myModal = this.modalCtrl.create("MapSelectPage", {
    //   latitude: this.latitude,
    //   longitude: this.longitude,
    //   address: value.address
    // });

    // myModal.onDidDismiss(data => {
    //   if (data) {
    //     
    //   }
    // });

    // myModal.present();
  }
}
