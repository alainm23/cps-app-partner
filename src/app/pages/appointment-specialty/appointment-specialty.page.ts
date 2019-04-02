import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { DatabaseService } from '../../services/database.service';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-appointment-specialty',
  templateUrl: './appointment-specialty.page.html',
  styleUrls: ['./appointment-specialty.page.scss'],
})
export class AppointmentSpecialtyPage implements OnInit {
  url_imagenes: string = "http://preview.cps.com.pe/";
  especialidades: any [];

  final_data: any = {
    precio_extranjero: 0,
    precio_nacional: 0,
    nombre: '',
    descripcion: '',
    fecha: '',
    medico_id: '',
    id_con: '',
    hor_con: ''
  };

  constructor(private api: ApiService,
              public loadingController: LoadingController,
              private navCtrl: NavController,
              private storage: StorageService) 
  { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Hellooo'
    });

    await loading.present();

    this.api.getEspecialidades ().subscribe ((data:any) => {
      this.especialidades = data.especialidades;
      loading.dismiss ();
    });
  }

  select (item: any) {
    this.clear_buttons (item.id);

    this.final_data.precio_extranjero = item.precio_extranjero;
    this.final_data.precio_nacional = item.precio_nacional;
    this.final_data.nombre = item.nombre;
    this.final_data.descripcion = item.descripcion;

    this.storage.setParams ('params', this.final_data);

    console.log (this.final_data);

    this.navCtrl.navigateForward ('appointment-date');
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
}
