import { Component, OnInit } from '@angular/core';

import { NavController, MenuController, LoadingController, ToastController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  ambulance: any;
  home_pressure: any;  
  home_doctor: any;

  oxygen_recharge: any;
  ads_materia: any;
  trainings: any;
  visits: any;
  medical_kit: any;
  occupational_exam: any
  constructor(public auth: AuthService, 
              private navCtrl: NavController,
              private database: DatabaseService,
              private storage: StorageService) 
  { 

  }

  ngOnInit() {
    this.auth.is_logged ().subscribe (response => {
      if (!response) {
        this.navCtrl.navigateRoot ('/login');
      } else {
        this.database.getSendAmbulance (response.uid).subscribe (data => {
          this.ambulance = data;
        });

        this.database.getHomePressureByKey (response.uid).subscribe (data => {
          this.home_pressure = data;
        });

        this.database.getHomeDoctorByKey (response.uid).subscribe (data => {
          this.home_doctor = data;
          console.log (data);
        });

        this.database.getOxygenRechargeById (response.uid).subscribe (data => {
          this.oxygen_recharge = data;
        });

        this.database.getADSMaterialById (response.uid).subscribe (data => {
          this.ads_materia = data;
        });

        this.database.getTrainingsById (response.uid).subscribe (data => {
          this.trainings = data;
        });

        this.database.getVisitsById (response.uid).subscribe (data => {
          this.visits = data;
        });

        this.database.getMedicalKitById (response.uid).subscribe (data => {
          this.medical_kit = data;
        });

        this.database.getOccupationalExamById (response.uid).subscribe (data => {
          this.occupational_exam = data;
        });
      }
    })
  }

  goSupplies () {
    this.navCtrl.navigateForward ("supplies");
  }

  goCPSRadio () {
    window.open ("http://www.radiocps.com/", "_system", "location=yes");
  }

  goBlogNews () {
    window.open ("http://preview.cps.com.pe/articles", "_system", "location=yes");
  }

  GoAppointmentSpecialty () {
    this.navCtrl.navigateForward ('appointment-specialty');
  }

  goEmergencyPage () {
    this.navCtrl.navigateForward ('emergency');
  }

  goHomeDoctor () {
    this.storage.setParams_v2 ({
      id: '',
      edit: false
    });

    this.navCtrl.navigateForward ('home-doctor');
  }

  goHomeNurse () {
    this.storage.setParams_v2 ({
      id: '',
      edit: false
    });
    
    this.navCtrl.navigateForward ('home-nurse');
  }

  goAmbulanceCheck () {
    this.storage.getValue ('uid').then (uid => {
      this.storage.setParams ('params', {
        id: uid
      });

      this.navCtrl.navigateForward ('ambulance-check');
    });
  }

  seeHomePressure () {
    this.storage.setParams_v2 ({
      id: this.home_doctor.id,
      type: this.home_pressure.state
    });
    
    this.navCtrl.navigateForward ('home-nurse-check');
  }

  seeHomeDoctor () {
    this.storage.setParams_v2 ({
      id: this.home_doctor.id,
      type: this.home_doctor.state
    });
    
    this.navCtrl.navigateForward ('home-doctor-check');
  }

  GoAdsMaterialDetail () {
    this.storage.setParams_v2 ({
      id: this.ads_materia.id,
      state: this.ads_materia.state
    });

    this.navCtrl.navigateForward ('ads-material-check');
  }

  goOxygenRechargeDetail () {
    this.storage.setParams_v2 ({
      id: this.oxygen_recharge.id,
      state: this.oxygen_recharge.state
    });

    this.navCtrl.navigateForward ('oxygen-recharge-check');
  }

  goTrainingsDetail () {
    this.storage.setParams_v2 ({
      id: this.trainings.id,
      state: this.trainings.state
    });

    this.navCtrl.navigateForward ('trainings-check');
  }

  goVisitsDetail () {
    this.storage.setParams_v2 ({
      id: this.visits.id,
      state: this.visits.state
    });

    this.navCtrl.navigateForward ('visits-check');
  }

  goOccupationalEexamDetail () {
    this.storage.setParams_v2 ({
              id: this.occupational_exam.id,
              state: this.occupational_exam.state
            });

            this.navCtrl.navigateForward ('occupational-exam-check');
  }

  goMedicalKitDetail () {
    this.storage.setParams_v2 ({
              id: this.medical_kit.id,
              state: this.medical_kit.state
            });

            this.navCtrl.navigateForward ('medical-kit-check');
  }
}
