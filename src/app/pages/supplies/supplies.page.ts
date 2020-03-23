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
    
  goOxygenRecharge () {
    this.storage.setParams_v2 ({
      edit: false
    });

    this.navCtrl.navigateForward ('oxygen-recharge');
  }

  GoAdsMaterial () {
    this.storage.setParams_v2 ({
      edit: false
    });

    this.navCtrl.navigateForward ('ads-material');
  }

  goTrainings () {
    this.storage.setParams_v2 ({
      edit: false
    });

    this.navCtrl.navigateForward ('trainings');
  }

  goVisits () {
    this.storage.setParams_v2 ({
      edit: false
    });

    this.navCtrl.navigateForward ('visits');
  }

  goOccupationalEexam () {
    this.storage.setParams_v2 ({
        edit: false
    });

    this.navCtrl.navigateForward ('occupational-exam');
  }

  goMedicalKit () {
    this.storage.setParams_v2 ({
      edit: false
    });

    this.navCtrl.navigateForward ('medical-kit');
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }
}
