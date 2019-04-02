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
  oxygen_recharge: any;
  ads_materia: any;
  trainings: any;
  visits: any;
  medical_kit: any;
  occupational_exam: any
  constructor(private navCtrl: NavController,
              private database: DatabaseService,
              private storage: StorageService,
              public alertController: AlertController,
              public actionSheetController: ActionSheetController,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.storage.getValue ("uid").then (id => {
      this.database.getOxygenRechargeById (id).subscribe (data => {
        this.oxygen_recharge = data;
      });

      this.database.getADSMaterialById (id).subscribe (data => {
        this.ads_materia = data;
      });

      this.database.getTrainingsById (id).subscribe (data => {
        this.trainings = data;
      });

      this.database.getVisitsById (id).subscribe (data => {
        this.visits = data;
      });

      this.database.getMedicalKitById (id).subscribe (data => {
        this.medical_kit = data;
      });

      this.database.getOccupationalExamById (id).subscribe (data => {
        this.occupational_exam = data;
      });
    });
  }

  async goOxygenRecharge () {
    if (this.oxygen_recharge === undefined) {
      this.storage.setParams_v2 ({
        edit: false
      });
      
      this.navCtrl.navigateForward ('oxygen-recharge');
    } else {
      const actionSheet = await this.actionSheetController.create ({
        header: 'Ya tiene una solicitud ya hecha, que desea hacer',
        buttons: [
        {
          text: 'Ver',
          handler: () => {
            this.storage.setParams_v2 ({
              id: this.oxygen_recharge.id,
              state: this.oxygen_recharge.state
            });

            this.navCtrl.navigateForward ('oxygen-recharge-check');
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
            this.confirm_cancel ('Confirmar cancelacion',
                                 'Esta seguro que desea cancelar la canceflacion de este pedido',
                                 this.oxygen_recharge.id,
                                 'oxygen_recharge');
          }
        }]
      });
      
      await actionSheet.present();
    }
  }

  async confirm_cancel (header: string, message: string, id: string, type: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      inputs: [
        {
          name: 'message',
          type: 'text',
          placeholder: 'Motivo'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (data) => {

          }
        }, 
        {
          text: 'Okay',
          handler: async (data) => {
            const loading = await this.loadingController.create({
              message: 'Hellooo'
            });
            
            await loading.present();

            if (type === 'oxygen_recharge') {
              this.oxygen_recharge.who_canceled = 'User';
              this.oxygen_recharge.date_canceled = new Date ().toISOString ();
              this.oxygen_recharge.why_canceled = data.message;
              this.oxygen_recharge.state = 'canceled';

              await this.database.cancelOxygenRecharge (this.oxygen_recharge);
              loading.dismiss ();
            } else if (type === 'ads-material') {
              this.ads_materia.who_canceled = 'User';
              this.ads_materia.date_canceled = new Date ().toISOString ();
              this.ads_materia.why_canceled = data.message;
              this.ads_materia.state = 'canceled';

              await this.database.cancelADSMaterial (this.ads_materia);
              loading.dismiss ();
            } else if (type === 'trainings') {
              this.trainings.who_canceled = 'User';
              this.trainings.date_canceled = new Date ().toISOString ();
              this.trainings.why_canceled = data.message;
              this.trainings.state = 'canceled';

              await this.database.cancelTrainings (this.trainings);
              loading.dismiss ();
            } else if (type === 'visits') {
              this.visits.who_canceled = 'User';
              this.visits.date_canceled = new Date ().toISOString ();
              this.visits.why_canceled = data.message;
              this.visits.state = 'canceled';

              await this.database.cancelVisits (this.visits);
              loading.dismiss ();
            } else if (type === 'medical_kit') {
              this.medical_kit.who_canceled = 'User';
              this.medical_kit.date_canceled = new Date ().toISOString ();
              this.medical_kit.why_canceled = data.message;
              this.medical_kit.state = 'canceled';

              await this.database.cancelMedicalKit (this.medical_kit);
              loading.dismiss ();
            } else if (type === 'occupational_exam') {
              this.occupational_exam.who_canceled = 'User';
              this.occupational_exam.date_canceled = new Date ().toISOString ();
              this.occupational_exam.why_canceled = data.message;
              this.occupational_exam.state = 'canceled';

              await this.database.cancelOccupationalExam (this.occupational_exam);
              loading.dismiss ();
            }
          }
        }
      ]
    });

    await alert.present ();
  }

  async GoAdsMaterial () {
    if (this.ads_materia === undefined) {
      this.storage.setParams_v2 ({
        edit: false
      });

      this.navCtrl.navigateForward ('ads-material');
    } else {
      const actionSheet = await this.actionSheetController.create ({
        header: 'Ya tiene una solicitud ya hecha, que desea hacer',
        buttons: [
        {
          text: 'Ver',
          handler: () => {
            this.storage.setParams_v2 ({
              id: this.ads_materia.id,
              state: this.ads_materia.state
            });

            this.navCtrl.navigateForward ('ads-material-check');
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
            this.confirm_cancel ('Confirmar cancelacion',
                                 'Esta seguro que desea cancelar la canceflacion de este pedido',
                                 this.ads_materia.id,
                                 'ads-material');
          }
        }]
      });
      
      await actionSheet.present();
    }
  }

  async goTrainings () {
    if (this.trainings === undefined) {
      this.storage.setParams_v2 ({
        edit: false
      });

      this.navCtrl.navigateForward ('trainings');
    } else {
      const actionSheet = await this.actionSheetController.create ({
        header: 'Ya tiene una solicitud ya hecha, que desea hacer',
        buttons: [
        {
          text: 'Ver',
          handler: () => {
            this.storage.setParams_v2 ({
              id: this.trainings.id,
              state: this.trainings.state
            });

            this.navCtrl.navigateForward ('trainings-check');
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
            this.confirm_cancel ('Confirmar cancelacion',
                                 'Esta seguro que desea cancelar la canceflacion de este pedido',
                                 this.trainings.id,
                                 'trainings');
          }
        }]
      });
      
      await actionSheet.present();
    }
  }

  async goVisits () {
    if (this.visits === undefined) {
      this.storage.setParams_v2 ({
        edit: false
      });

      this.navCtrl.navigateForward ('visits');
    } else {
      const actionSheet = await this.actionSheetController.create ({
        header: 'Ya tiene una solicitud ya hecha, que desea hacer',
        buttons: [
        {
          text: 'Ver',
          handler: () => {
            this.storage.setParams_v2 ({
              id: this.visits.id,
              state: this.visits.state
            });

            this.navCtrl.navigateForward ('visits-check');
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
            this.confirm_cancel ('Confirmar cancelacion',
                                 'Esta seguro que desea cancelar la canceflacion de este pedido',
                                 this.visits.id,
                                 'visits');
          }
        }]
      });
      
      await actionSheet.present();
    }
  }

  async goOccupationalEexam () {
    if (this.occupational_exam === undefined) {
      this.storage.setParams_v2 ({
        edit: false
      });

      this.navCtrl.navigateForward ('occupational-exam');
    } else {
      const actionSheet = await this.actionSheetController.create ({
        header: 'Ya tiene una solicitud ya hecha, que desea hacer',
        buttons: [
        {
          text: 'Ver',
          handler: () => {
            this.storage.setParams_v2 ({
              id: this.occupational_exam.id,
              state: this.occupational_exam.state
            });

            this.navCtrl.navigateForward ('occupational-exam-check');
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
            this.confirm_cancel ('Confirmar cancelacion',
                                 'Esta seguro que desea cancelar la canceflacion de este pedido',
                                 this.occupational_exam.id,
                                 'occupational_exam');
          }
        }]
      });
      
      await actionSheet.present();
    }
  }

  async goMedicalKit () {
    if (this.medical_kit === undefined) {
      this.storage.setParams_v2 ({
        edit: false
      });

      this.navCtrl.navigateForward ('medical-kit');
    } else {
      const actionSheet = await this.actionSheetController.create ({
        header: 'Ya tiene una solicitud ya hecha, que desea hacer',
        buttons: [
        {
          text: 'Ver',
          handler: () => {
            this.storage.setParams_v2 ({
              id: this.medical_kit.id,
              state: this.medical_kit.state
            });

            this.navCtrl.navigateForward ('medical-kit-check');
          }
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
            this.confirm_cancel ('Confirmar cancelacion',
                                 'Esta seguro que desea cancelar la canceflacion de este pedido',
                                 this.medical_kit.id,
                                 'medical_kit');
          }
        }]
      });
      
      await actionSheet.present();
    }
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }
}
