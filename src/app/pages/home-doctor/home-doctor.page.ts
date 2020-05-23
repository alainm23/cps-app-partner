import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormControl, FormGroup, Validators} from "@angular/forms";

import { Platform, NavController, MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
// Ionic
import { ModalController } from '@ionic/angular'; 

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

declare var google: any;
// Modals
import { SelectCountriesPage } from '../../modals/select-countries/select-countries.page';
@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.page.html',
  styleUrls: ['./home-doctor.page.scss'],
})
export class HomeDoctorPage implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  form: FormGroup;
  map: any;
  
  latitude: number = 0;
  longitude: number = 0;
  _id: string = "";
  is_edit: boolean = false;

  pais_selected: any = {
    name: "Peru",
    dial_code: "+51",
    code: "PE"
  };

  min_date: string = new Date ().toISOString ();
  directionsService: any = new google.maps.DirectionsService ();  

  loading: any;
  constructor(private modalCtrl: ModalController,
              public navCtrl: NavController,
              private database: DatabaseService,
              public auth: AuthService,
              public api: ApiService,
              private locationAccuracy: LocationAccuracy,
              private androidPermissions: AndroidPermissions,
              private storage: StorageService,
              public loadingController: LoadingController,
              private platform: Platform,
              private geolocation: Geolocation) { }

  async ngOnInit() {
    this.form = new FormGroup({
      address: new FormControl ("", [Validators.required]),
      hour: new FormControl ("", [Validators.required]),
      note: new FormControl (""),
      date: new FormControl (new Date ().toISOString (), [Validators.required]),
      phone_number: new FormControl (this.auth.user.phone_number, [Validators.required]),
      lang: new FormControl ('es', Validators.required),
    });
    
    this.loading = await this.loadingController.create({
      message: 'Tu solicitud está en procesando... Espere un momento'
    });
    
    this.loading.present();

    this.storage.getParams_2 ().then (data => {
      const params = JSON.parse (data);

      if (params.edit === true) {
        this.is_edit = true;

        this.database.getHomeDoctorByKey (params.id).subscribe ((data: any) => {
          this.form.controls ["address"].setValue (data.address);
          this.form.controls ["hour"].setValue (data.hour);
          this.form.controls ["note"].setValue (data.note);
          this.form.controls ["date"].setValue (data.date);
          this.form.controls ["phone_number"].setValue (data.user_phone_number);

          this.form.controls ["lang"].setValue (data.lang);

          this.latitude = data.latitude;
          this.longitude = data.longitude;
          this._id = data.id;

          this.InitMap (true, data.latitude, data.longitude);
        });
      } else { 
        this.is_edit = false;

        if (this.platform.is ('cordova')) {
          this.checkGPSPermission ();
        } else {
          this.getLocationCoordinates ();
        }
      }
    });
  }

  goEmergency () {
    this.navCtrl.navigateForward ('emergency');
  }

  get_hours () {
    let list = [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00']

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

  async InitMap (is_edit: boolean, latitude: number, longitude: number) {
    let location = new google.maps.LatLng (latitude, longitude);

    const options = {
      draggable: !is_edit,  
      scrollwheel: !is_edit, 
      disableDoubleClickZoom: is_edit,
      center: location,
      zoom: 15,
      disableDefaultUI: true,
      streetViewControl: false,
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

    this.map = await new google.maps.Map (this.mapRef.nativeElement, options);

    if (this.map === null || this.map === undefined) {
      console.log ('Error del puto GPS');
      this.loading.dismiss ();  
    } else {
      this.loading.dismiss ();
    } 

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

    if (is_edit) {
      try {
        let elem = document.getElementById ('map-card');
        elem.setAttribute("style", "opacity: 0.5;");
      }catch (error) {
        console.log (error);
      }
    } else {
      try {
        let elem = document.getElementById ('map-card');
        elem.setAttribute("style", "opacity: 1;");
      }catch (error) {
        console.log (error);
      }
    }
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

  async submit () {
    const loading = await this.loadingController.create({
      message: 'Tu solicitud está en procesando... Espere un momento'
    });
    
    await loading.present();
     
    const value = this.form.value;

    this.storage.getValue ("uid").then (uid => {
      this.storage.getValue ("token_id").then (token_id => {
        let data: any = {
          id: uid,
          token_id: token_id,
          address: value.address,

          lang: value.lang,

          hour: value.hour,
          note: value.note,
          latitude: this.latitude,
          longitude: this.longitude,
          date: value.date,
          price: 0,
          delivery_price: 0,
          delivery_time: 0,
          is_checked: false,  
          is_paid: false,
          is_sent: false,
          state: 'created',
          last_message: '',
          transaccion_id: '',
          payment_type: '', //online, cash,
          why_canceled: '',
          who_canceled: '',
          who_canceled_name: '',
          created_date: new Date ().toISOString (), 
          canceled_date: '',
          arrived_date: '',
          approved_date: '',
          completed_date: '',
          admi_id: '',
          admi_name: '',
          user_phone_number: value.phone_number,
          user_fullname: this.auth.user.fullname,
          user_email: this.auth.user.email,
          country_name: this.pais_selected.name,
          country_dial_code: this.pais_selected.dial_code,
          country_code: this.pais_selected.code,
          solicitante: 'partner'
        };

        if (this.is_edit) {
          data.id = this._id;

          this.database.updateHomeDoctor (this._id, data).then ((response) => {
            let push_data = {
              titulo: 'Pedido de doctor a domicilio',
              detalle: 'Un pedido de doctor a domicilio fue corregido',
              destino: 'doctor',
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
          });
        } else {
          this.database.addHomeDoctor (uid, data).then ((response) => {
            let push_data = {
              titulo: 'Pedido de doctor a domicilio',
              detalle: 'Un pedido de doctor a domicilio fue solicitado',
              destino: 'doctor',
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
          });
        }
      });
    });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }

  async checkGPSPermission () {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
      .then ((result: any) => {
        if (result.hasPermission) {
          //alert ("Tiene permiso, preguntamos para prender el GPS");
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS ();
        } else {
  
          //If not having permission ask for permission
          //alert ("No tiene permiso, preguntamos para ternerlo");
          this.requestGPSPermission ();
        }
      },
      err => {
        alert (err);
      }
    );
  }

  askToTurnOnGPS () {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(() => {
        this.getLocationCoordinates ();
      }, error => {
        this.loading.dismiss ();
        this.navCtrl.pop ();
        console.log ('Error requesting location permissions ' + JSON.stringify(error))
      });
  }

  async requestGPSPermission () {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(() => {
            this.askToTurnOnGPS ();
          }, error => {
            this.loading.dismiss ();
            this.navCtrl.pop ();
            console.log ('requestPermission Error requesting location permissions ' + error)
          }
        );
      }
    });
  }

  async getLocationCoordinates () {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.InitMap (false, resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      this.loading.dismiss ();
      console.log ('Error getting location' + error);
    });
  }
}
