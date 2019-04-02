import { Injectable } from '@angular/core';

import { Events } from '@ionic/angular';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

declare var Culqi: any;

@Injectable({
  providedIn: 'root'   
})
export class PaymentService {

  constructor(public http: HttpClient,
              private events: Events) {
    document.addEventListener ('payment_event', (token: any) => {
      let token_id = token.detail;

      this.events.publish ('get_token', token_id);
    }, false);
  }

  initCulqi () {
    // Ingresa tu "Puclic Key" que te da Culqi aqui
    Culqi.publicKey = 'pk_test_yycfYRkVXy5z38km';
  }

  cfgFormulario (descripcion: string, cantidad: number) {
    Culqi.settings ({
      title: 'Clinica Peruano Suiza',
      currency: 'PEN',
      description: descripcion,
      amount: cantidad
    });
  }

  open () {
    Culqi.open ();
  }
}
