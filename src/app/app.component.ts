import { Component } from '@angular/core';

import { NavController, MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      moment.locale('es');
    });
  }

  goAppointmentListPage () {
    this.navCtrl.navigateForward ('appointment-list');
  }

  goOrders () {
    this.navCtrl.navigateForward ('orders');
  }
}
