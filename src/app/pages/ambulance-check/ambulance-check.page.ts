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
  selector: 'app-ambulance-check',
  templateUrl: './ambulance-check.page.html',
  styleUrls: ['./ambulance-check.page.scss'],
})
export class AmbulanceCheckPage implements OnInit {
  @ViewChild('map2') mapRef: ElementRef;
  loading: any;

  map: any;
  marker: any;
  marker_ambulance: any;
  ambulance_object: any;  

  ambulance_marker: any;

  directionsDisplay: any;
  directionsService: any;
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
    this.storage.getParams ('params').then (async (data) => {
      const params = JSON.parse (data);
      
      this.loading = await this.loadingController.create({
        message: 'Hellooo'
      });
    
      await this.loading.present();

      this.database.getSendAmbulance (params.id).subscribe ((data: any) => {
        if (data) {
          this.ambulance_object = data;

          this.InitMap (data.latitude, data.longitude);

          if (data.state === 'sent') {
            this.addRute (data.latitude, data.longitude, data.ambulance_ori_lat, data.ambulance_ori_lon);
          }
        }        
      });
    });
  }

  InitMap (latitude: number, longitude:number) {
    this.loading.dismiss ();
    let location = new google.maps.LatLng (latitude, longitude);
    
    const options = {
      center: location,
      zoom: 17,
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

    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Direccion',
      animation: google.maps.Animation.DROP
    });

    this.directionsDisplay = new google.maps.DirectionsRenderer ();
    this.directionsService = new google.maps.DirectionsService ();
  }

  update (arrived: boolean, canceled: boolean) {
    /*
    const confirm = this.alertCtrl.create({
      title: '¿Cancelar pedido?',
      message: 'Estas seguro que deseas cancelar este pedido',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Ok',
          handler: (data) => {

            this.loading = this.loadingCtrl.create ({
              content: 'Cargando...'
            });
            
            this.loading.present ().then (() => {
                this.database.updateSendAmbulance (this.ambulance_object.id, arrived, canceled)
                  .then (() => {
                    this.loading.dismiss ();
                    this.goHome ();
                  });
            });
          }
        }
      ]
    });

    confirm.present();
    */
  }

  async cancel () {
    const alert = await this.alertController.create({
      header: '¿Cancelar pedido?',
      message: 'Estas seguro que deseas cancelar este pedido',
      inputs: [
        {
          name: 'message',
          placeholder: 'Motivo de cancelacion'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Ok',
          handler: async (data) => {
            const loading = await this.loadingController.create({
              message: 'Procesando ...'
            });
          
            await loading.present();

            await this.database.cancelSendAmbulance (this.ambulance_object, data.message);
            loading.dismiss ();
            this.goHome ();
          }
        }
      ]
    });

    alert.present();
  }

  callNow () {
    /*
    this.callNumber.callNumber("+51989316622", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
    */
  }

  addRute (latitude: number, longitude: number, ambulance_lat: number, ambulance_lon: number) {
    let point_ambulance = new google.maps.LatLng (ambulance_lat, ambulance_lon);
    let point_destino = new google.maps.LatLng (latitude, longitude);

    this.directionsDisplay.setMap (this.map);

    let request = {
      origin: point_ambulance,
      destination: point_destino,
      travelMode: google.maps.TravelMode ['DRIVING']
    }

    this.directionsService.route (request, (response, status) => {
      if (status == 'OK') {
        this.directionsDisplay.setDirections(response);
      }
    });

    this.marker_ambulance = new google.maps.Marker({
      position: point_ambulance,
      map: this.map,
      icon: 'assets/ambulance.svg'
    });

    this.marker_ambulance.setMap(this.map);
  }

  updateMark (ambulance_lat: number, ambulance_lon: number) {
    let location = new google.maps.LatLng (ambulance_lat, ambulance_lon);
    this.marker_ambulance.setPosition (location);
  }

  arrived () {
    /*
    const confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.loading = this.loadingCtrl.create ({
              content: 'Cargando...'
            });
            
            this.loading.present ().then (() => {
              this.database.updateSendAmbulanceArrived (this.ambulance_object)
                .then (() => {
                  this.loading.dismiss ();
                  this.goHome ();
                });
            });
          }
        }
      ]
    });

    confirm.present();
    */
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }
}
