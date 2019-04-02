import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

import { Events } from '@ionic/angular';
import { NavController, MenuController, LoadingController, ToastController, AlertController } from '@ionic/angular';

import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ads-material',
  templateUrl: './ads-material.page.html',
  styleUrls: ['./ads-material.page.scss'],
})
export class AdsMaterialPage implements OnInit {
  is_edit: boolean = false;

  item_01: boolean = false;
  item_02: boolean = false;
  item_03: boolean = false;
  item_04: boolean = false;
  item_05: boolean = false;

  color: string = "white";
  color_selected: string = "blue";

  color_01: string = this.color; 
  color_02: string = this.color; 
  color_03: string = this.color; 
  color_04: string = this.color; 
  color_05: string = this.color; 
  constructor(public navCtrl: NavController,
              public alertController: AlertController,
              private events: Events,
              private database: DatabaseService,
              private auth: AuthService,
              private storage: StorageService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.storage.getParams_2 ().then (data => {
      const params = JSON.parse (data);

      if (params.edit === true) {
        this.is_edit = true;

        this.database.getOxygenRechargeById (params.id).subscribe ((data: any) => {
          if (data) {
            this.item_01 = data.mapas;
            this.item_02 = data.portafiles;
            this.item_03 = data.lapiceros;
            this.item_04 = data.blocks;
            this.item_05 = data.ambientador;

            this.check_toggle ();
          }
        });
      }
    });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }
    
  check_toggle () {
    if (this.item_01) {
      this.item_01 = true;
      this.color_01 = this.color_selected;
    }

    if (this.item_02) {
      this.item_02 = true;
      this.color_02 = this.color_selected;
    }

    if (this.item_03) {
      this.item_03 = true;
      this.color_03 = this.color_selected;
    }

    if (this.item_04) {
      this.item_04 = true;
      this.color_04 = this.color_selected;
    }

    if (this.item_05) {
      this.item_05 = true;
      this.color_05 = this.color_selected;
    }
  }

  change_value (val: number) {
    if (val === 1) {
      if (this.item_01) {
        this.item_01 = false;
        this.color_01 = this.color;
      } else {
        this.item_01 = true;
        this.color_01 = this.color_selected;
      }
    } else if (val === 2) {
      if (this.item_02) {
        this.item_02 = false;
        this.color_02 = this.color;
      } else {
        this.item_02 = true;
        this.color_02 = this.color_selected;
      }
    } else if (val === 3) {
      if (this.item_03) {
        this.item_03 = false;
        this.color_03 = this.color;
      } else {
        this.item_03 = true;
        this.color_03 = this.color_selected;
      }
    } else if (val === 4) {
      if (this.item_04) {
        this.item_04 = false;
        this.color_04 = this.color;
      } else {
        this.item_04 = true;
        this.color_04 = this.color_selected;
      }
    } else if (val === 5) {
      if (this.item_05) {
        this.item_05 = false;
        this.color_05 = this.color;
      } else {
        this.item_05 = true;
        this.color_05 = this.color_selected;
      }
    }
  }

  async submit () {
    if (this.item_01 === false && this.item_02 === false && 
        this.item_03 === false && this.item_04 === false &&
        this.item_05 === false) {
      const alert = await this.alertController.create({
        header: 'Ninguna opcion seleccionada',
        message: 'Tiene que marcar almenos una opcion.',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      const loading = await this.loadingController.create({
        message: 'Hellooo'
      });
            
      await loading.present();

      this.storage.getValue ('uid').then (async (uid) => {
        const data: any = {
          id: uid,
          mapas: this.item_01,
          portafiles: this.item_02,
          lapiceros: this.item_03,
          blocks:this.item_04,
          ambientador: this.item_05,
          created_date: new Date ().toISOString (),
          ruc: this.auth.user.ruc,
          user_phone_number: this.auth.user.phone_number,
          user_fullname: this.auth.user.fullname,
          user_email: this.auth.user.email,
          user_country_name: this.auth.user.country_name,
          user_country_dial_code: this.auth.user.country_dial_code,
          user_country_code: this.auth.user.country_code,
          user_logotipo: this.auth.user.logotipo,
          user_company_name: this.auth.user.company_name,
          user_address: this.auth.user.address,
          state: 'created',
          why_canceled: '',
          who_canceled: '',
          admi_id: '',
          admi_name: '',
          canceled_date: '',
          approved_date: '',
          finalized_date: ''
        };
              
        if (this.is_edit) {
          await this.database.updateADSMaterial (uid, data);
          loading.dismiss ();
          this.goHome ();
        } else {
          await this.database.addADSMaterial (uid, data);
          loading.dismiss ();
          this.goHome ();
        }  
      });
    }
  }
}
