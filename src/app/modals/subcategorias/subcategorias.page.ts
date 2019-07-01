import { Component, OnInit, Input } from '@angular/core';
// Ionic
import { NavController, MenuController, ModalController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.page.html',
  styleUrls: ['./subcategorias.page.scss'],
})
export class SubcategoriasPage implements OnInit {
  @Input () id: string;
  list: any [];
  constructor(private modalCtrl: ModalController, private api: ApiService, public loadingController: LoadingController,) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Éspere un momento...'
    });
    
    await loading.present();

    this.api.getvariaciones (this.id, "es").subscribe (response => {
      this.list = response;
      loading.dismiss ();
    });
  }

  closeModal() {
    this.modalCtrl.dismiss (null, 'close');
  }

  item_selected (item: any) {
    console.log (item);
    this.modalCtrl.dismiss ({
      precio_extranjero: item.precio_extranjero,
      precio_nacional: item.precio_nacional,
      nombre_referencia: item.nombre_referencia,
      descripcion: item.descripcion
    }, 'response');
  }
}
