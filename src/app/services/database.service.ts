import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { first, map, mergeMap } from 'rxjs/operators';
import { combineLatest, of } from "rxjs";

import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private afs: AngularFirestore) 
  {

  }

  get_User_Partner (uid: string) {
    return this.afs.collection ("User_Partner").doc (uid).valueChanges ();
  }

  async addAppointment (id: string, data: any) {
    let codigo = this.afs.createId ();
   
    data.key = codigo;

    var batch = this.afs.firestore.batch ();

    let delivery = this.afs.collection('Appointments').doc (codigo).ref;
    let user_delivery = this.afs.collection('UsersAppointments').doc (id).collection ("Appointments").doc (codigo).ref;

    batch.set (delivery, data);
    batch.set (user_delivery, { "key" : codigo });

    await batch.commit ()

    return codigo;
  }

  getAppointmentByKey (key: string) {
    return this.afs.collection ("Appointments").doc (key).valueChanges ();
  }

  getAppointmentsByUser (id: string) {
    const collection = this.afs.collection ("UsersAppointments").doc (id).collection ("Appointments");

    return collection.snapshotChanges ().pipe (map ((refReferencias: any) => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getAppointmentByKey (data.key).pipe (map (dataAppointment => Object.assign ({}, {data, dataAppointment})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  // Ambulances
  getSendAmbulance (id: string) {
    return this.afs.collection ("Emergencias_Progreso").doc (id).valueChanges ();
  }
 
  async addSendAmbulance (data: any, id: string) {
    var batch = this.afs.firestore.batch ();

    let step_1 = this.afs.collection ('Emergencias_Progreso').doc (id).ref;
    
    batch.set (step_1, data);

    await batch.commit ();
  }

  getSendAmbulancesLocation (id: string) {
    return this.afs.collection ('Emergencias_Progreso').doc (id).collection ('tracking').doc ('tracking').valueChanges ();
  }
  
  async cancelSendAmbulance (data: any, message: string) {
    data.why_canceled = message;

    const codigo = this.afs.createId ();

    var batch = this.afs.firestore.batch ();
    
    let step_1 = this.afs.collection ('Emergencias_Progreso').doc (data.id).ref;
    batch.delete (step_1);

    let step_2 = this.afs.collection ('Emergencias_Canceladas').doc (codigo).ref;
    batch.set (step_2, data);

    let step_3 = this.afs.collection ('Usuario_Cancelados').doc (data.id).collection ("Emergencias").doc (codigo).ref;
    batch.set (step_3, { 'id': codigo });

    let step_4 = this.afs.collection ('Admin_Canceladas').doc ("Emergencias").collection (moment().format('YYYY[-]MM')).doc (codigo).ref;
    batch.set (step_4, { 'id': codigo });
    
    return await batch.commit (); 
  }

  async updateSendAmbulanceArrived (data: any) {
    var batch = this.afs.firestore.batch ();

    let step_1 = this.afs.collection ('SendAmbulances').doc (data.id).ref;
    let step_2 = this.afs.collection ('SendAmbulancesFinalized').doc (data.id).ref;
    let step_3 = this.afs.collection ('SendAmbulancesSent').doc (data.id).ref;
    let step_4 = this.afs.collection ('Ambulances').doc (data.ambulance_id).ref;
    let step_5 = this.afs.collection ('Users').doc (data.driver_id).ref;

    batch.update (step_1, { 'state': 'finalized', 'who_finished': 'user' });
    batch.set (step_2, { 'id': data.id, 'driver_id': data.driver_id });
    batch.delete (step_3);
    batch.update (step_4, { 'is_free': true, 'driver_id': data.driver_id, 'order_id': data.id });
    batch.update (step_4, { 'is_free': true });

    return await batch.commit ();
  }

  updateSendAmbulance (id: string, arrived: boolean, canceled: boolean) {
    return this.afs.collection<any> ("SendAmbulances").doc (id).update ({
                                                                        is_arrived: arrived, 
                                                                        is_canceled: canceled, 
                                                                        who_canceled: 'user',
                                                                       });
  }

  // Oxyn Recgargue
  async addOxygenRecharge (uid: string, data: any) {
    var batch = this.afs.firestore.batch ();

    let step_1 = this.afs.collection('Recarga_Oxigeno_Proceso').doc (uid).ref;

    batch.set (step_1, data);
    return await batch.commit ();
  }

  getOxygenRechargeById (id: string) {
    return this.afs.collection ('Recarga_Oxigeno_Proceso').doc (id).valueChanges ();
  }

  async cancelOxygenRecharge (data: any) {
    const old_id = data.id;

    const codigo = this.afs.createId ();
    data.id = codigo;

    var batch = this.afs.firestore.batch ();
    
    let step_1 = this.afs.collection ('Recarga_Oxigeno_Proceso').doc (old_id).ref;
    batch.delete (step_1);

    let step_2 = this.afs.collection ('Recarga_Oxigeno_Cancelados').doc (codigo).ref;
    batch.set (step_2, data);

    let step_3 = this.afs.collection ('Usuario_Cancelados').doc (old_id).collection ("Recarga_Oxigeno").doc (codigo).ref;
    batch.set (step_3, { 'id': codigo });

    let step_4 = this.afs.collection ('Admin_Canceladas').doc ("Recarga_Oxigeno").collection (moment().format('YYYY[-]MM')).doc (codigo).ref;
    batch.set (step_4, { 'id': codigo });
    
    return await batch.commit (); 
  }

  getOxygenRechargeCanceladoByKey (id: string) {
    return this.afs.collection ('Recarga_Oxigeno_Cancelados').doc (id).valueChanges ();
  }

  getOxygenRechargeCanceled (id: string) {
    const collection = this.afs.collection ("Usuario_Cancelados").doc (id).collection ("Recarga_Oxigeno");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getOxygenRechargeCanceladoByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getOxygenRechargeFinalizadosByKey (id: string) {
    return this.afs.collection ('Recarga_Oxigeno_Finalizados').doc (id).valueChanges ();
  }

  getOxygenRechargeFinalizados (id: string) {
    const collection = this.afs.collection ("Usuario_Finalizados").doc (id).collection ("Recarga_Oxigeno");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getOxygenRechargeFinalizadosByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  async updateOxygenRecharge (uid: string, data: any) {
    return this.afs.collection ('Recarga_Oxigeno_Proceso').doc (uid).update (data);
  } 

  // AdsMaterial
  async addADSMaterial (uid: string, data: any) {
    var batch = this.afs.firestore.batch ();

    let step_1 = this.afs.collection('Material_Publicitario_Proceso').doc (uid).ref;

    batch.set (step_1, data);
    return await batch.commit ();
  }

  getADSMaterialById (id: string) {
    return this.afs.collection ('Material_Publicitario_Proceso').doc (id).valueChanges ();
  }

  async cancelADSMaterial (data: any) {
    const old_id = data.id;

    const codigo = this.afs.createId ();
    data.id = codigo;

    var batch = this.afs.firestore.batch ();
    
    let step_1 = this.afs.collection ('Material_Publicitario_Proceso').doc (old_id).ref;
    batch.delete (step_1);

    let step_2 = this.afs.collection ('Material_Publicitario_Cancelados').doc (codigo).ref;
    batch.set (step_2, data);

    let step_3 = this.afs.collection ('Usuario_Cancelados').doc (old_id).collection ("Material_Publicitario").doc (codigo).ref;
    batch.set (step_3, { 'id': codigo });

    let step_4 = this.afs.collection ('Admin_Canceladas').doc ("Material_Publicitario").collection (moment().format('YYYY[-]MM')).doc (codigo).ref;
    batch.set (step_4, { 'id': codigo });
    
    return await batch.commit (); 
  }

  getADSMaterialCanceladoByKey (id: string) {
    return this.afs.collection ('Material_Publicitario_Cancelados').doc (id).valueChanges ();
  }

  getADSMaterialCanceled (id: string) {
    const collection = this.afs.collection ("Usuario_Cancelados").doc (id).collection ("Material_Publicitario");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getADSMaterialCanceladoByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getADSMaterialFinalizadosByKey (id: string) {
    return this.afs.collection ('Material_Publicitario_Finalizados').doc (id).valueChanges ();
  }

  getADSMaterialFinalizados (id: string) {
    const collection = this.afs.collection ("Usuario_Finalizados").doc (id).collection ("Material_Publicitario");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getADSMaterialFinalizadosByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  async updateADSMaterial (uid: string, data: any) {
    return this.afs.collection ('Material_Publicitario_Proceso').doc (uid).update (data);
  }

  // Trainings
  async addTrainings (uid: string, data: any) {
    var batch = this.afs.firestore.batch ();

    let step_1 = this.afs.collection('Capacitaciones_Proceso').doc (uid).ref;

    batch.set (step_1, data);
    return await batch.commit ();
  }

  getTrainingsById (id: string) {
    return this.afs.collection ('Capacitaciones_Proceso').doc (id).valueChanges ();
  }

  async cancelTrainings (data: any) {
    const old_id = data.id;

    const codigo = this.afs.createId ();
    data.id = codigo;

    var batch = this.afs.firestore.batch ();
    
    let step_1 = this.afs.collection ('Capacitaciones_Proceso').doc (old_id).ref;
    batch.delete (step_1);

    let step_2 = this.afs.collection ('Capacitaciones_Canceladas').doc (codigo).ref;
    batch.set (step_2, data);

    let step_3 = this.afs.collection ('Usuario_Cancelados').doc (old_id).collection ("Capacitaciones").doc (codigo).ref;
    batch.set (step_3, { 'id': codigo });

    let step_4 = this.afs.collection ('Admin_Canceladas').doc ("Capacitaciones").collection (moment().format('YYYY[-]MM')).doc (codigo).ref;
    batch.set (step_4, { 'id': codigo });
    
    return await batch.commit (); 
  }

  getTrainingsCanceladoByKey (id: string) {
    return this.afs.collection ('Capacitaciones_Canceladas').doc (id).valueChanges ();
  }

  getTrainingsCanceled (id: string) {
    const collection = this.afs.collection ("Usuario_Cancelados").doc (id).collection ("Capacitaciones");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getTrainingsCanceladoByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getTrainingsFinalizadosByKey (id: string) {
    return this.afs.collection ('Capacitaciones_Finalizadas').doc (id).valueChanges ();
  }

  getTrainingsFinalizados (id: string) {
    const collection = this.afs.collection ("Usuario_Finalizados").doc (id).collection ("Capacitaciones");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getTrainingsFinalizadosByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  async updateTrainings (uid: string, data: any) {
    return this.afs.collection ('Capacitaciones_Proceso').doc (uid).update (data);
  }

  // Visits
  async addVisits (uid: string, data: any) {
    var batch = this.afs.firestore.batch ();

    let step_1 = this.afs.collection('Visitas_Proceso').doc (uid).ref;

    batch.set (step_1, data);
    return await batch.commit ();
  }

  getVisitsById (id: string) {
    return this.afs.collection ('Visitas_Proceso').doc (id).valueChanges ();
  }

  async cancelVisits (data: any) {
    const old_id = data.id;

    const codigo = this.afs.createId ();
    data.id = codigo;

    var batch = this.afs.firestore.batch ();
    
    let step_1 = this.afs.collection ('Visitas_Proceso').doc (old_id).ref;
    batch.delete (step_1);

    let step_2 = this.afs.collection ('Visitas_Canceladas').doc (codigo).ref;
    batch.set (step_2, data);

    let step_3 = this.afs.collection ('Usuario_Cancelados').doc (old_id).collection ("Visitas").doc (codigo).ref;
    batch.set (step_3, { 'id': codigo });

    let step_4 = this.afs.collection ('Admin_Canceladas').doc ("Visitas").collection (moment().format('YYYY[-]MM')).doc (codigo).ref;
    batch.set (step_4, { 'id': codigo });
    
    return await batch.commit (); 
  }

  getVisitsCanceladoByKey (id: string) {
    return this.afs.collection ('Visitas_Canceladas').doc (id).valueChanges ();
  }

  getVisitsCanceled (id: string) {
    const collection = this.afs.collection ("Usuario_Cancelados").doc (id).collection ("Visitas");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getVisitsCanceladoByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getVisitsFinalizadosByKey (id: string) {
    return this.afs.collection ('Visitas_Finalizadas').doc (id).valueChanges ();
  }

  getVisitsFinalizados (id: string) {
    const collection = this.afs.collection ("Usuario_Finalizados").doc (id).collection ("Visitas");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getVisitsFinalizadosByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  async updateVisits (uid: string, data: any) {
    return this.afs.collection ('Visitas_Proceso').doc (uid).update (data);
  }

  // MedicalKit
  async addMedicalKit (uid: string, data: any) {
    var batch = this.afs.firestore.batch ();

    let step_1 = this.afs.collection('Botiquin_Proceso').doc (uid).ref;

    batch.set (step_1, data);
    return await batch.commit ();
  }

  getMedicalKitById (id: string) {
    return this.afs.collection ('Botiquin_Proceso').doc (id).valueChanges ();
  }

  async cancelMedicalKit (data: any) {
    const old_id = data.id;

    const codigo = this.afs.createId ();
    data.id = codigo;

    var batch = this.afs.firestore.batch ();
    
    let step_1 = this.afs.collection ('Botiquin_Proceso').doc (old_id).ref;
    batch.delete (step_1);

    let step_2 = this.afs.collection ('Botiquin_Cancelados').doc (codigo).ref;
    batch.set (step_2, data);

    let step_3 = this.afs.collection ('Usuario_Cancelados').doc (old_id).collection ("Botiquin").doc (codigo).ref;
    batch.set (step_3, { 'id': codigo });

    let step_4 = this.afs.collection ('Admin_Canceladas').doc ("Botiquin").collection (moment().format('YYYY[-]MM')).doc (codigo).ref;
    batch.set (step_4, { 'id': codigo });
    
    return await batch.commit (); 
  }

  getMedicalKitCanceladoByKey (id: string) {
    return this.afs.collection ('Botiquin_Cancelados').doc (id).valueChanges ();
  }

  getMedicalKitCanceled (id: string) {
    const collection = this.afs.collection ("Usuario_Cancelados").doc (id).collection ("Botiquin");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getMedicalKitCanceladoByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getMedicalKitFinalizadosByKey (id: string) {
    return this.afs.collection ('Botiquin_Finalizados').doc (id).valueChanges ();
  }

  getMedicalKitFinalizados (id: string) {
    const collection = this.afs.collection ("Usuario_Finalizados").doc (id).collection ("Botiquin");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getMedicalKitFinalizadosByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  async updateMedicalKit (uid: string, data: any) {
    return this.afs.collection ('Botiquin_Proceso').doc (uid).update (data);
  }

  // OccupationalExam
  async addOccupationalExam (uid: string, data: any) {
    var batch = this.afs.firestore.batch ();

    let step_1 = this.afs.collection('Examen_Ocupacional_Proceso').doc (uid).ref;

    batch.set (step_1, data);
    return await batch.commit ();
  }

  getOccupationalExamById (id: string) {
    return this.afs.collection ('Examen_Ocupacional_Proceso').doc (id).valueChanges ();
  }

  async cancelOccupationalExam (data: any) {
    const old_id = data.id;

    const codigo = this.afs.createId ();
    data.id = codigo;

    var batch = this.afs.firestore.batch ();
    
    let step_1 = this.afs.collection ('Examen_Ocupacional_Proceso').doc (old_id).ref;
    batch.delete (step_1);

    let step_2 = this.afs.collection ('Examen_Ocupacional_Cancelados').doc (codigo).ref;
    batch.set (step_2, data);

    let step_3 = this.afs.collection ('Usuario_Cancelados').doc (old_id).collection ("Examen_Ocupacional").doc (codigo).ref;
    batch.set (step_3, { 'id': codigo });

    let step_4 = this.afs.collection ('Admin_Canceladas').doc ("Examen_Ocupacional").collection (moment().format('YYYY[-]MM')).doc (codigo).ref;
    batch.set (step_4, { 'id': codigo });
    
    return await batch.commit (); 
  }

  getOccupationalExamCanceladoByKey (id: string) {
    return this.afs.collection ('Examen_Ocupacional_Cancelados').doc (id).valueChanges ();
  }

  getOccupationalExamCanceled (id: string) {
    const collection = this.afs.collection ("Usuario_Cancelados").doc (id).collection ("Examen_Ocupacional");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getOccupationalExamCanceladoByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getOccupationalExamFinalizadosByKey (id: string) {
    return this.afs.collection ('Examen_Ocupacional_Finalizados').doc (id).valueChanges ();
  }

  getOccupationalExamFinalizados (id: string) {
    const collection = this.afs.collection ("Usuario_Finalizados").doc (id).collection ("Examen_Ocupacional");

    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getOccupationalExamFinalizadosByKey (data.id).pipe (map (dataGeneral => Object.assign ({}, { data, dataGeneral })));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  async updateOccupationalExam (uid: string, data: any) {
    return this.afs.collection ('Examen_Ocupacional_Proceso').doc (uid).update (data);
  }
}
