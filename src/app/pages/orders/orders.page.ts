import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

import { Events } from '@ionic/angular';
import { NavController, MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';

import * as moment from 'moment';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  oxygen_recharge_created;
  oxygen_recharge_canceled;
  oxygen_recharge_finalized;

  ads_material_created;
  ads_material_canceled;
  ads_material_finalized;

  trainings_created;
  trainings_canceled;
  trainings_finalized;

  visits_created;
  visits_canceled;
  visits_finalized;

  medical_kit_created;
  medical_kit_canceled;
  medical_kit_finalized;

  occupational_exam_created;
  occupational_exam_canceled;
  occupational_exam_finalized;

  oxygen_recharge_selec: string = 's';
  ads_material_selec: string = 's';
  trainings_selec: string = 's';
  visits_selec: string = 's';
  medical_kit_selec: string = 's';
  occupational_exam_selec: string = 's';
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              private events: Events,
              private database: DatabaseService,
              private auth: AuthService,
              private storage: StorageService,
              public loadingController: LoadingController) { }
  ngOnInit() {
    this.storage.getValue ("uid").then (uid => {
      this.database.getOxygenRechargeById (uid).subscribe (data => {
        this.oxygen_recharge_created = data;
      });

      this.database.getOxygenRechargeCanceled (uid).subscribe (data => {
        this.oxygen_recharge_canceled = data;
      });

      this.database.getOxygenRechargeFinalizados (uid).subscribe (data => {
        this.oxygen_recharge_finalized = data;
      });

      this.database.getADSMaterialById (uid).subscribe (data => {
        this.ads_material_created = data;
      });

      this.database.getADSMaterialCanceled (uid).subscribe (data => {
        this.ads_material_canceled = data;
      });

      this.database.getADSMaterialFinalizados (uid).subscribe (data => {
        this.ads_material_finalized = data;
      });

      this.database.getTrainingsById (uid).subscribe (data => {
        this.trainings_created = data;
      });

      this.database.getTrainingsCanceled (uid).subscribe (data => {
        this.trainings_canceled = data;
      });

      this.database.getTrainingsFinalizados (uid).subscribe (data => {
        this.trainings_finalized = data;
      });

      this.database.getVisitsById (uid).subscribe (data => {
        this.visits_created = data;
      });

      this.database.getVisitsCanceled (uid).subscribe (data => {
        this.visits_canceled = data;
      });

      this.database.getVisitsFinalizados (uid).subscribe (data => {
        this.visits_finalized = data;
      });

      this.database.getMedicalKitById (uid).subscribe (data => {
        this.medical_kit_created = data;
      });

      this.database.getMedicalKitCanceled (uid).subscribe (data => {
        this.medical_kit_canceled = data;
      });

      this.database.getMedicalKitFinalizados (uid).subscribe (data => {
        this.medical_kit_finalized = data;
      });


      this.database.getOccupationalExamById (uid).subscribe (data => {
        this.occupational_exam_created = data;
      });

      this.database.getOccupationalExamCanceled (uid).subscribe (data => {
        this.occupational_exam_canceled = data;
      });

      this.database.getOccupationalExamFinalizados (uid).subscribe (data => {
        this.occupational_exam_finalized = data;
      });
    });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }

  change (val: any, type: string) {
    if (type === 'oxygen_recharge') {
      this.oxygen_recharge_selec = val.detail.value;
    } else if (type  === 'ads_material') {
      this.ads_material_selec = val.detail.value;
    } else if (type === 'trainings') {
      this.trainings_selec = val.detail.value;
    } else if (type === 'visits') {
      this.visits_selec = val.detail.value;
    } else if (type === 'medical_kit') {
      this.medical_kit_selec = val.detail.value;
    } else if (type === 'occupational_exam') {
      this.occupational_exam_selec = val.detail.value;
    }
  }

  getRelativeDateTime (data: string) {
    return moment(data, "").fromNow();
  }

  checkOxygenRecharge (data: any) {
    this.storage.setParams_v2 ({
      id: data.id,
      state: data.state
    });

    this.navCtrl.navigateForward ('oxygen-recharge-check');
  }

  checkAdsMaterial (data: any) {
    this.storage.setParams_v2 ({
      id: data.id,
      state: data.state
    });

    this.navCtrl.navigateForward ('ads-material-check');
  }

  checkTrainings (data: any) {
    this.storage.setParams_v2 ({
      id: data.id,
      state: data.state
    });

    this.navCtrl.navigateForward ('trainings-check');
  }

  checkVisits (data: any) {
    this.storage.setParams_v2 ({
      id: data.id,
      state: data.state
    });

    this.navCtrl.navigateForward ('visits-check');
  }

  checkMedicalKit (data: any) {
    this.storage.setParams_v2 ({
      id: data.id,
      state: data.state
    });

    this.navCtrl.navigateForward ('medical-kit-check');
  }

  checkOccupationalExam (data: any) {
    this.storage.setParams_v2 ({
      id: data.id,
      state: data.state
    });

    this.navCtrl.navigateForward ('occupational-exam-check');
  }
}
