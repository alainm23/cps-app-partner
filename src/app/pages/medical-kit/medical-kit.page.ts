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
  selector: 'app-medical-kit',
  templateUrl: './medical-kit.page.html',
  styleUrls: ['./medical-kit.page.scss'],
})
export class MedicalKitPage implements OnInit {
  is_edit: boolean = false;

  item_01: boolean = false;
  item_02: boolean = false;

  color: string = "white";
  color_selected: string = "blue";

  color_01: string = this.color; 
  color_02: string = this.color; 
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

        this.database.getMedicalKitById (params.id).subscribe ((data: any) => {
          if (data) {
            this.item_01 = data.b_new;
            this.item_02 = data.b_add;

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

      this.item_02 = false;
      this.color_02 = this.color;
    } else {
      this.item_01 = false;
      this.color_01 = this.color;

      this.item_02 = true;
      this.color_02 = this.color_selected;
    }
  }

  change_value (val: number) {
    if (val === 1) {
      if (this.item_01) {
        this.item_01 = false;
        this.color_01 = this.color;

        this.item_02 = true;
        this.color_02 = this.color_selected;
      } else {
        this.item_01 = true;
        this.color_01 = this.color_selected;

        this.item_02 = false;
        this.color_02 = this.color;
      }
    } else if (val === 2) {
      if (this.item_02) {
        this.item_02 = false;
        this.color_02 = this.color;

        this.item_01 = true;
        this.color_01 = this.color_selected;
      } else {
        this.item_02 = true;
        this.color_02 = this.color_selected;

        this.item_01 = false;
        this.color_01 = this.color;
      }
    }
  }

  async submit () {
    const loading = await this.loadingController.create({
      message: 'Hellooo'
    });
           
    await loading.present();

    this.storage.getValue ('uid').then (async (uid) => {
      const data: any = {
        id: uid,
        b_new: this.item_01,
        b_add: this.item_02,
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
        await this.database.updateMedicalKit (uid, data);
        loading.dismiss ();
        this.goHome ();
      } else {
        await this.database.addMedicalKit (uid, data);
        loading.dismiss ();
        this.goHome ();
      }  
    });
  }
}
