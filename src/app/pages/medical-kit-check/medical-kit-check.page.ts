import { Component, OnInit } from '@angular/core';

import { AlertController, ActionSheetController, NavController, MenuController, LoadingController, ToastController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';

import * as moment from 'moment';

@Component({
  selector: 'app-medical-kit-check',
  templateUrl: './medical-kit-check.page.html',
  styleUrls: ['./medical-kit-check.page.scss'], 
})
export class MedicalKitCheckPage implements OnInit {
  _object: any;
  constructor(private navCtrl: NavController,
              private database: DatabaseService,
              private storage: StorageService,
              public alertController: AlertController,
              public actionSheetController: ActionSheetController,
              public loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Tu solicitud está en procesando... espere un momento'
    });
            
    await loading.present();
    
    this.storage.getParams_2 ().then (data => {
      const params = JSON.parse (data);

      if (params.state === 'created' || params.state === 'approved') {
        this.database.getMedicalKitById (params.id).subscribe (data => {
          this._object = data;
          loading.dismiss ();
        });
      } else if (params.state === 'canceled') {
        this.database.getMedicalKitCanceladoByKey (params.id).subscribe (data => {
          this._object = data;
          loading.dismiss ();
        });
      } else if (params.state === 'finalized') {
        this.database.getMedicalKitFinalizadosByKey (params.id).subscribe (data => {
          this._object = data;
          loading.dismiss ();
        });
      }
    });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }

  edit () {
    this.storage.setParams_v2 ({
      id: this._object.id,
      edit: true
    });

    this.navCtrl.navigateForward ('medical-kit');
  }

  cancel () {
    this.database.cancelMedicalKit (this._object)
      .then (() => {
        this.goHome ();
      });
  }

  getRelativeDateTime (data: string) {
    return moment(data, "").fromNow();
  }
   
  getFormatDateTime (data: string) {
    return moment(data).format("lll"); 
  }
}
