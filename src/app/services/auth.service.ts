import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from '../services/database.service';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = {
    id: '',
    fullname: '',
    email: '',
    phone_number:'',
    is_active: '',
    ruc: '',
    address: '',
    company_name: '',
    logotipo: '',
    country_name: '',
    country_dial_code: '',
    country_code: '',
  }
  
  constructor(public afAuth: AngularFireAuth,
              private database: DatabaseService,
              private storage: StorageService) {
    this.afAuth.authState.subscribe (data => {
      if (data) {
        this.storage.setValue ("uid", data.uid);
        this.database.get_User_Partner (data.uid).subscribe (data => {
          this.user = data;
        });
      }
    });
  }

  is_logged () {
    return this.afAuth.authState;
  }

  loginEmailPassword (email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword (email, password);
  }

  signOut () {
    return this.afAuth.auth.signOut ();
  }
}
