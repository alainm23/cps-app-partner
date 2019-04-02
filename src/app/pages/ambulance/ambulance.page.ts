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

declare var google: any;

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

  directionsService: any = new google.maps.DirectionsService ();
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              private events: Events,
              private database: DatabaseService,
              private storage: StorageService,
              public loadingController: LoadingController,
              private api: ApiService,
              private auth: AuthService,
              private payment: PaymentService,
              private geolocation: Geolocation) { }

  ngOnInit() {
    this.form = new FormGroup({
      phone_number: new FormControl ('', [Validators.required]),
      address: new FormControl ('', [Validators.required])
    });

    this.InitMap ();
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }
  
  async InitMap () {
    const loading = await this.loadingController.create({
        message: 'Hellooo'
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
      let data: any = {
        id: id,
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
        country_name: this.auth.user.country_name,
        country_dial_code: this.auth.user.country_dial_code,
        country_code: this.auth.user.country_code,
      };

      await this.database.addSendAmbulance (data, data.id);
      await loading.dismiss ();
      this.goHome ();
    });
  }
}
