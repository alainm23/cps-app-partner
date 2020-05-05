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

  directionsService: any = new google.maps.DirectionsService ();
  constructor(public navCtrl: NavController,
              private database: DatabaseService,
              private modalCtrl: ModalController,
              private storage: StorageService,
              public loadingController: LoadingController,
              private api: ApiService,
              private auth: AuthService,
              private callNumber: CallNumber,
              private geolocation: Geolocation) { }

  ngOnInit() {
    this.form = new FormGroup({
      phone_number: new FormControl (this.auth.user.phone_number, [Validators.required]),
      address: new FormControl ('', [Validators.required])
    });

    this.InitMap ();
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }
  
  async InitMap () {
    const loading = await this.loadingController.create({
        message: 'Tu solicitud está en procesando... Espere un momento'
      });
    
    await loading.present();
    
    this.geolocation.getCurrentPosition().then((resp) => {
      loading.dismiss ();

      let location = new google.maps.LatLng (resp.coords.latitude, resp.coords.longitude);

      const options = {
        center: location,
        zoom: 15,
        disableDefaultUI: true,
        streetViewControl: false,
        disableDoubleClickZoom: false,
        clickableIcons: false,
        scaleControl: true,
        styles: [
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "poi.business",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
              "visibility": "off"
            }]
          },
          {
            "featureType": "transit",
            "stylers": [{
              "visibility": "off"
            }]
          }
        ],
        mapTypeId: 'roadmap',
      }

      this.map = new google.maps.Map (this.mapRef.nativeElement, options);

      google.maps.event.addListener(this.map, 'idle', () => {
        let location = this.map.getCenter ();
        
        this.latitude = location.lat ();
        this.longitude = location.lng ();

        let request = {
          origin: location,
          destination: location,
          travelMode: google.maps.TravelMode.WALKING
        };
            
        let placesService = new google.maps.places.PlacesService (this.map);

        this.directionsService.route(request, (result, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
            let d = result.routes [0].legs [0].start_address;
            
            let d_list = d.split (" ");;
                
            let _direccion = "";
            for (let letter of d_list) {
              if (letter != "Cusco," && letter != "Perú" && letter != "Cusco" && letter != "08000" && letter != "08000,") {
              _direccion = _direccion + letter + " ";
              }
            }

            if (_direccion.charAt (_direccion.length - 2) == ",") {
              this.form.controls ["address"].setValue (_direccion.substring (0, _direccion.length - 2));
            }
          }
        });
      });
    }, error => {
      loading.dismiss ();
      console.log('Error getting location', error);
    });
  }

  async getCurrentLocation () {
    const loading = await this.loadingController.create({
        message: 'Buscando su ubicación ...'
      });
    
    await loading.present();

    
    this.geolocation.getCurrentPosition ().then (position => {
      loading.dismiss().then(() => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      let location = new google.maps.LatLng (lat, lng);
      this.map.setZoom (17);
      this.map.panTo (location);
      });
    });
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
          titulo: 'Emergencia en progreso',
          detalle: 'Una solicitud de ambulancia fue creada',
          destino: 'ambulance-check',
          mode: 'tags',
          clave: data.id,
          tokens: 'Administrador,Admision',
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
}
