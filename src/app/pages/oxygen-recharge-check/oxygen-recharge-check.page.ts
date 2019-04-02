import { Component, OnInit } from '@angular/core';

import { AlertController, ActionSheetController, NavController, MenuController, LoadingController, ToastController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-oxygen-recharge-check',
  templateUrl: './oxygen-recharge-check.page.html',
  styleUrls: ['./oxygen-recharge-check.page.scss'],
})
export class OxygenRechargeCheckPage implements OnInit {
  _object: any;
  constructor(private navCtrl: NavController,
              private database: DatabaseService,
              private storage: StorageService,
              public alertController: AlertController,
              public actionSheetController: ActionSheetController,
              public loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Hellooo'
    });
            
    await loading.present();
    
    this.storage.getParams_2 ().then (data => {
      const params = JSON.parse (data);

      if (params.state === 'created') {
        this.database.getOxygenRechargeById (params.id).subscribe (data => {
          this._object = data;
          loading.dismiss ();
        });
      } else if (params.state === 'canceled') {
        this.database.getOxygenRechargeCanceladoByKey (params.id).subscribe (data => {
          this._object = data;
          loading.dismiss ();
        });
      } else if (params.state === 'finalized') {
        this.database.getOxygenRechargeFinalizadosByKey (params.id).subscribe (data => {
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

    this.navCtrl.navigateForward ('oxygen-recharge');
  }
}
