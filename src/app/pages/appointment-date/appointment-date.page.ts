import { Component, OnInit } from '@angular/core';
 
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { DatabaseService } from '../../services/database.service';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

import { LoadingController, NavController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-appointment-date',
  templateUrl: './appointment-date.page.html',
  styleUrls: ['./appointment-date.page.scss'],  
})
export class AppointmentDatePage implements OnInit {
  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  eventList: any;
  selectedEvent: any;
  isSelected: any;

  final_date_format: string;

  enabled_days = [];
  citas: any [];
  horas: any [];

  final_data: any = {
    precio_extranjero: 0,
    precio_nacional: 0,
    nombre: '',
    nombre_referencia: '',
    fecha: '',
    medico_id: '',
    id_con: '', 
    hor_con: ''
  };

  check_1: boolean = false;
  check_2: boolean = false;
  constructor(private api: ApiService,
              public loadingController: LoadingController,
              private navCtrl: NavController,
              private storage: StorageService) { }

  async ngOnInit() {
    this.storage.getParams ("params").then (async (data: any) => {
      const params = JSON.parse (data);

      this.final_data.precio_extranjero = params.precio_extranjero;
      this.final_data.precio_nacional = params.precio_nacional;
      this.final_data.nombre = params.nombre;
      this.final_data.nombre_referencia = params.nombre_referencia;
      this.final_data.descripcion = params.descripcion;

      this.date = new Date();
      this.monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiember","Octubre","Novimbre","Diciembre"];
      this.getDaysOfMonth();

      const loading = await this.loadingController.create({
        message: 'Tu solicitud está en procesando... Espere un momento'
      });
    
      await loading.present();

      this.api.getCitasEspecialidad (this.final_data.nombre_referencia.toLowerCase ()).subscribe ((data: any) => {
        console.log ('citas', data.citas);

        this.citas = data.citas;
        this.enabled_days = [];

        for (let cita of data.citas) {
          let date = new Date (cita.fec_cit);
          date.setDate (date.getDate() + 1);
          this.enabled_days.push (date);
        }
        
        this.getDaysOfMonth ();
        loading.dismiss ();
      });
    });
  }

  goHome () {
    this.navCtrl.navigateRoot ('home');
  }

  is_enable_day (day: number) {
    let month = this.date.getMonth ();
    let year = this.date.getFullYear ();

    let dinamic_date = new Date(year, month, day);
    
    for (let date of this.enabled_days) {
      if (date.getDate() === dinamic_date.getDate()) {
        if (date.getMonth () === dinamic_date.getMonth()) {
          return true;
        }
      }
    }
    
    return false;  
  }

  getDaysOfMonth () {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j+1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    for (var k = 0; k < (6 - lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k+1);
    }

    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays < 36) {
      for(var l = (7-lastDayThisMonth); l < ((7-lastDayThisMonth)+7); l++) {
        this.daysInNextMonth.push (l) ;
      }
    }
  }

  goToLastMonth () {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth ();
    this.clear_all_days ();
  }

  goToNextMonth () {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth ();
    this.clear_all_days ();
  }

  async selectDate(day: number, id: any) {
    let month = this.date.getMonth ();
    let year = this.date.getFullYear ();

    let dinamic_date = new Date (year, month, day);

    for (let date of this.enabled_days) {
      if (date.getDate () === dinamic_date.getDate ()) {
        if (date.getMonth () === dinamic_date.getMonth ()) {
          const loading = await this.loadingController.create({
            message: 'Tu solicitud está en procesando... Espere un momento'
          });
        
          await loading.present();

          this.clear_all_days ();
            
          let elem = document.getElementById ('calendar-' + day.toString ());
          elem.setAttribute("style", "border: 3px solid #230084; border-radius: 12px; color: #fff !important;");

          let _month = month.toString();
          let _day = day.toString();

          if (_month.length <= 1) {
            _month = "0" + (month + 1).toString();
          }

          if (_day.length <= 1) {
            _day = "0" + day.toString();
          }

          this.final_data.fecha = year.toString() + "-" + _month + "-" + _day;

          for (let cita of this.citas) {
            if (cita.fec_cit === this.final_data.fecha) {
              this.final_data.medico_id = cita.med_esp;
            }
          } 
          
          this.api.getHorariosFecha (this.final_data.medico_id, this.final_data.fecha).subscribe ((data: any) => {
            loading.dismiss ();              
            this.check_1 = true;
            this.horas = data.horas;

            console.log (data.horas);
          }, error => {
            loading.dismiss ();  
            console.log ('Error getHorariosFecha', error);
          });
        }
      }
    }
  }

  clear_all_days () {
    for (let day of this.daysInThisMonth) {
      try {
        let elem = document.getElementById ('calendar-' + day);
        elem.setAttribute("style", "background-color: #fff;");
      } catch (error) {
        console.log (error);
      }
    }
  }

  isMorning (time: string): boolean {
    var hour = time.substring (0, 2);
    var _hour = parseInt (hour);

    if (_hour >= 0 && _hour < 13) {
      return true;
    }
    
    return false;
  }

  isAfternoon (time: string): boolean {
    var hour = time.substring (0, 2);
    var _hour = parseInt (hour);

    if (_hour >= 12 && _hour < 18) {
      return true;
    }

    return false;
  }

  isEvening (time: string): boolean {
    var hour = time.substring (0, 2);
    var _hour = parseInt (hour);

    if (_hour >= 18 && _hour < 23) {
      return true;
    }
    
    return false;
  }

  selectHour (hour: any) {
    this.check_2 = true;

    this.final_data.id_con = hour.id_con;
    this.final_data.hor_con = hour.hor_con;
    this.final_date_format = moment(this.final_data.fecha + ' ' + hour.hor_con).format('LL');
    
    this.storage.setParams ('params', this.final_data);
    this.navCtrl.navigateForward ('appointment-checkout');
    //this.clearHour (hour.id_con);
  }

  clearHour (id) {
    try {
      let elem_selected = document.getElementById ('h-' + id);
      elem_selected.setAttribute("style", "background-color: #230084; color: #ffffff;");
       
      for (let item of this.horas) {        
        try {
          if (item.id_con !== id) {
            let elem = document.getElementById ('h-' + item.id_con);
            elem.setAttribute("style", "background-color: #fff; color: #333;");
          }
        } catch (error) {
          console.log (error);
        }
      }
    } catch (error) {
      console.log (error);
    }
  }

  goNext () {
    console.log (this.final_data);
    
    this.storage.setParams ('params', this.final_data);
    this.navCtrl.navigateForward ('appointment-checkout');
  }

  goEmergency () {
    this.navCtrl.navigateForward ("ambulance");
  }
}
