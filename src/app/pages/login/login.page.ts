import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import * as firebase from "firebase";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  constructor(private auth: AuthService, 
              public loadingController: LoadingController,
              public database: DatabaseService,
              private navCtrl: NavController,
              public alertController: AlertController) { }

  ngOnInit () {
    this.form = new FormGroup ({
      email: new FormControl ('', Validators.required),
      password: new FormControl ('', Validators.required)
    });
  }

  async onSubmit () {
    const loading = await this.loadingController.create({
      message: 'Tu solicitud está en procesando... Espere un momento'
    });

    await loading.present ();

    const value = this.form.value;

    this.auth.loginEmailPassword (value.email, value.password)
      .then (response => {
        this.database.get_User_Partner (response.user.uid).subscribe (async (data: any) => {
          if (data.is_active) {
            this.navCtrl.navigateRoot ('/home');
          } else {
            let alert = await this.alertController.create({
              header: 'Opppps!',
              message: 'Su cuenta no tiene los privilegios necesarios...',
              buttons: ['OK']
            });

            await alert.present().then (() => {
              this.auth.signOut ();
            });
          }

          loading.dismiss ();
        });
      }, async (error: firebase.FirebaseError) => {
        loading.dismiss ();
        let errorMessage: string = "";

        if (error.code == "auth/network-request-failed") {
          errorMessage = "No tienes acceso a internet, no se puede proceder."
        } else if (error.code == "auth/user-not-found") {
          errorMessage = "No encontramos a nigun usuario con ese correo";
        } else if (error.code == "auth/wrong-password") {
          errorMessage = "Ingrese una contraseña valida";
        } else if (error.code == "auth/too-many-requests") {
          errorMessage = "Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Inténtalo más tarde.";
        } else {
          errorMessage = error.message;
        }

        let alert = await this.alertController.create({
          header: 'Opppps!',
          message: errorMessage,
          buttons: ['OK']
        });

        await alert.present();
      })
  }
}
