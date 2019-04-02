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
  constructor(private auth: AuthService, 
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

  goAmbulanceCheck () {
    this.storage.getValue ('uid').then (uid => {
      this.storage.setParams ('params', {
        id: uid
      });

      this.navCtrl.navigateForward ('ambulance-check');
    });
  }
}
