import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  setParams (key: string, data: any) {
    return this.storage.set (key, JSON.stringify(data));
  }

  setParams_v2 (data: any) {
    return this.storage.set ('params', JSON.stringify(data))
  } 

  getParams (key: string) {
    return this.storage.get (key);
  }

  getParams_2 () {
    return this.storage.get ('params');
  }

  setValue (key: string, value: any) {
    this.storage.set (key, value);
  }

  getValue (key: string) {
    return this.storage.get (key);
  }
}
   