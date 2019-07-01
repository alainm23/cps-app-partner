import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

import { LoadingController, NavController } from '@ionic/angular';
// Ionic
import { ModalController } from '@ionic/angular';    

import { SubcategoriasPage } from '../../modals/subcategorias/subcategorias.page';
@Component({
  selector: 'app-appointment-specialty',
  templateUrl: './appointment-specialty.page.html',
  styleUrls: ['./appointment-specialty.page.scss'],
})
export class AppointmentSpecialtyPage implements OnInit {
  url_imagenes: string = "http://preview.cps.com.pe/";
  especialidades: any [];
  servicios: any [];
  sintomas: any = [];

  is_services_loading: boolean = false;
  is_sintomas_loading: boolean = false;

  final_data: any = {
    precio_extranjero: 0,
    precio_nacional: 0,
    nombre: '',
    nombre_referencia: '',
    descripcion: '',
    fecha: '',
    medico_id: '',
    id_con: '',
    hor_con: ''
  };

  is_specialties: boolean = true;
  type: string = 'specialties';
  text_changed: string = "Ver por sintomas";
  constructor(private api: ApiService,
              public alertController: AlertController,
              public loadingController: LoadingController,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private storage: StorageService) 
  { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Tu solicitud está en procesando... Espere un momento'
    });

    await loading.present();

    this.api.getEspecialidades ().subscribe ((data:any) => {
      this.especialidades = data.especialidades;
      loading.dismiss ();
    });
    /*
    if (this.isConnected ()) {
      
    } else {
      await loading.dismiss ();

      const alert = await this.alertController.create({
        header: 'Sin red',
        message: 'Comprueba tu conexión a Internet',
        buttons: ['Ok']
      });

      await alert.present();

      this.goHome ();
    }
    */
  }

  async select (item: any) {
    console.log (item);

    if (item.tiene_variaciones === '0' || item.tiene_variaciones === undefined || item.tiene_variaciones === null) {
      //this.clear_buttons (item.id);

      this.final_data.precio_extranjero = item.precio_extranjero;
      this.final_data.precio_nacional = item.precio_nacional;
      this.final_data.nombre = item.nombre;
      this.final_data.nombre_referencia = item.nombre_referencia;
      this.final_data.descripcion = item.descripcion;

      this.storage.setParams ('params', this.final_data);
      this.navCtrl.navigateForward ('appointment-date');
    } else {
      const modal = await this.modalCtrl.create({
        component: SubcategoriasPage,
        mode: 'ios',
        componentProps: { id: item.esp_id }
      });

      modal.onDidDismiss ().then ((response: any) => {
        if (response.role == 'response') {
          this.final_data.precio_extranjero = response.data.precio_extranjero;
          this.final_data.precio_nacional = response.data.precio_nacional;
          this.final_data.nombre = response.data.nombre_referencia;
          this.final_data.descripcion = response.data.descripcion;

          this.storage.setParams ('params', this.final_data);
          this.navCtrl.navigateForward ('appointment-date');
        }
      });

      return await modal.present();
    }
  }

  clear_buttons (id) {
    try {
      let elem = document.getElementById ('es-' + id);
      elem.setAttribute("style", "border: 6px solid #230084;");
     
      for (let item of this.especialidades) {  
        try {
          if (item.id !== id) {
            let elem = document.getElementById ('es-' + item.id);
            elem.setAttribute("style", "border: 0px solid #fff;");
          }
        } catch (error) {
          console.log (error);
        }
      }
    } catch (error) {
      console.log (error);
    }
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }

  async segmentChanged (event: any) {
    console.log (event);
    if (event.detail.value === 'services') {
      if (this.is_services_loading === false) {
        const loading = await this.loadingController.create({
          message: 'Tu solicitud está en procesando... Espere un momento'
        });

        await loading.present();

        this.api.getServices ("es").subscribe (data => {
          this.servicios = data;
          this.is_services_loading = true;
          console.log (data);
          loading.dismiss ();
        }, error => {
          //loading.dismiss();
          console.log (error);
          //this.navCtrl.pop ();
        });
      }
    }
  }

  async changeEs () {
    if (this.is_specialties) {
      this.text_changed = "Ver por especialidad";
      this.is_specialties = false;

      if (this.is_sintomas_loading === false) {
        const loading = await this.loadingController.create({
          message: 'Tu solicitud está en procesando... Espere un momento'
        });

        await loading.present();
        
        this.api.getsintomas ("es").subscribe (data => {
          this.sintomas = data;
          this.is_sintomas_loading = true;
          console.log (data);
          loading.dismiss ();
        }, error => {
          //loading.dismiss();
          console.log (error);
          //this.navCtrl.pop ();
        });
      }
    } else {
      this.is_specialties = true;
      this.text_changed = "Ver por sintomas";
    }
  }
}
