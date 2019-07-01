import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API: string;
  constructor(public http: HttpClient) {
    this.API = "https://api.cps.com.pe/api";
  }

  getEspecialidades () {
    let url = this.API + "/getespecialidades/es";
    
    return this.http.get (url);
  }
  
  getServices (lang: string) {
    let url = this.API + '/getservicios/' + lang;
    
    return this.http.get (url).map ((data: any) => {
        return data.especialidades;      
    }, (error: HttpErrorResponse) => {
      if (error.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }

  getsintomas (lang: string) {
    let url = this.API + '/getsintomas/' + lang;
    
    return this.http.get (url).map ((data: any) => {
        return data.sintomas;      
    }, (error: HttpErrorResponse) => {
      if (error.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }
  
  getvariaciones (id: string, lang: string) {
    let url = this.API + '/getvariaciones/' + id + '/' + lang;

    console.log (url);

    return this.http.get (url).map ((data: any) => {
        return data.variaciones;      
    }, (error: HttpErrorResponse) => {
      if (error.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }
  
  getCitasEspecialidad (name: string) {
    let url = this.API + "/getcitasespecialidad/" + name;

    return this.http.get (url);
  }

  getHorariosFecha (medico_id: string, date: string) {
    let url = this.API + '/gethorariosfecha/' + medico_id + '/' + date;
    
    return this.http.get (url);
  }

  sendMessage (data: any) {
    let url = this.API + "/enviaremergenciaapp";

    return this.http.post (url, data);
  }

  procesarPago (data: any) {
    let url = "https://api.cps.com.pe/api/procesarpagoapp/";
    url += data.token + "/";
    url += data.monto + "/";
    url += data.correo + "/";
    url += data.moneda + "/";
    url += data.des + "/";
    url += data.consulta + "/";
    url += data.doctor;

    console.log ("URL: " + url);

    return this.http.get (url);
  }

  procesarPago2 (data: any) {
    let url = "https://api.cps.com.pe/api/procesarpago2app/";

    url += data.token + "/";
    url += data.monto + "/";
    url += data.correo + "/";
    url += data.moneda + "/";
    url += data.des;

    console.log (url);

    return this.http.get (url);
  }  

  checkoutapp (data: any) {
    let url = "https://api.cps.com.pe/api/checkoutapp";
    return this.http.post (url, data);
  }

  pushNotification (data: any) {
    let url = "https://api.cps.com.pe/api/send-notification";
    return this.http.post (url, data);
  }
}
