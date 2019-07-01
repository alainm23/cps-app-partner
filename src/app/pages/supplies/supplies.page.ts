import { Component, OnInit } from '@angular/core';

import { AlertController, ActionSheetController, NavController, MenuController, LoadingController, ToastController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.page.html',
  styleUrls: ['./supplies.page.scss'],
})
export class SuppliesPage implements OnInit {
  
  constructor(private navCtrl: NavController,
              private database: DatabaseService,
              private storage: StorageService,
              public alertController: AlertController,
              public actionSheetController: ActionSheetController,
              public loadingController: LoadingController) { }

  ngOnInit() {
  }
    
  async goOxygenRecharge () {
    this.storage.setParams_v2 ({
      edit: false
    });

    this.navCtrl.navigateForward ('oxygen-recharge');
  }

  async GoAdsMaterial () {
    this.storage.setParams_v2 ({
      edit: false
    });

    this.navCtrl.navigateForward ('ads-material');
  }

  async goTrainings () {
    this.storage.setParams_v2 ({
      edit: false
    });

    this.navCtrl.navigateForward ('trainings');
  }

  async goVisits () {
    this.storage.setParams_v2 ({
      edit: false
    });

    this.navCtrl.navigateForward ('visits');
  }

  async goOccupationalEexam () {
    this.storage.setParams_v2 ({
        edit: false
      });

      this.navCtrl.navigateForward ('occupational-exam');
  }

  async goMedicalKit () {
    this.storage.setParams_v2 ({
        edit: false
      });

      this.navCtrl.navigateForward ('medical-kit');
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }
}
