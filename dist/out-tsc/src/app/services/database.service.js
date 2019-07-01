import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { map } from 'rxjs/operators';
import { combineLatest, of } from "rxjs";
import * as moment from 'moment';
var DatabaseService = /** @class */ (function () {
    function DatabaseService(afs) {
        this.afs = afs;
    }
    DatabaseService.prototype.get_User_Partner = function (uid) {
        return this.afs.collection("User_Partner").doc(uid).valueChanges();
    };
    DatabaseService.prototype.updateToken = function (uid, token) {
        return this.afs.collection("User_Partner").doc(uid).update({ token_id: token });
    };
    DatabaseService.prototype.addAppointment = function (id, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var codigo, batch, delivery, user_delivery;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        codigo = this.afs.createId();
                        data.key = codigo;
                        batch = this.afs.firestore.batch();
                        delivery = this.afs.collection('Appointments').doc(codigo).ref;
                        user_delivery = this.afs.collection('UsersAppointments').doc(id).collection("Appointments").doc(codigo).ref;
                        batch.set(delivery, data);
                        batch.set(user_delivery, { "key": codigo });
                        return [4 /*yield*/, batch.commit()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, codigo];
                }
            });
        });
    };
    DatabaseService.prototype.getAppointmentByKey = function (key) {
        return this.afs.collection("Appointments").doc(key).valueChanges();
    };
    DatabaseService.prototype.getAppointmentsByUser = function (id) {
        var _this = this;
        var collection = this.afs.collection("UsersAppointments").doc(id).collection("Appointments");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getAppointmentByKey(data.key).pipe(map(function (dataAppointment) { return Object.assign({}, { data: data, dataAppointment: dataAppointment }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    // Ambulances
    DatabaseService.prototype.getSendAmbulance = function (id) {
        return this.afs.collection("Emergencias_Progreso").doc(id).valueChanges();
    };
    DatabaseService.prototype.addSendAmbulance = function (data, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var batch, step_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Emergencias_Progreso').doc(id).ref;
                        batch.set(step_1, data);
                        return [4 /*yield*/, batch.commit()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseService.prototype.getSendAmbulancesLocation = function (id) {
        return this.afs.collection('Emergencias_Progreso').doc(id).collection('tracking').doc('tracking').valueChanges();
    };
    DatabaseService.prototype.cancelSendAmbulance = function (data, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var codigo, batch, step_1, step_2, step_3, step_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data.why_canceled = message;
                        codigo = this.afs.createId();
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Emergencias_Progreso').doc(data.id).ref;
                        batch.delete(step_1);
                        step_2 = this.afs.collection('Emergencias_Canceladas').doc(codigo).ref;
                        batch.set(step_2, data);
                        step_3 = this.afs.collection('Usuario_Cancelados').doc(data.id).collection("Emergencias").doc(codigo).ref;
                        batch.set(step_3, { 'id': codigo });
                        step_4 = this.afs.collection('Admin_Canceladas').doc("Emergencias").collection(moment().format('YYYY[-]MM')).doc(codigo).ref;
                        batch.set(step_4, { 'id': codigo });
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.updateSendAmbulanceArrived = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var batch, step_1, step_2, step_3, step_4, step_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('SendAmbulances').doc(data.id).ref;
                        step_2 = this.afs.collection('SendAmbulancesFinalized').doc(data.id).ref;
                        step_3 = this.afs.collection('SendAmbulancesSent').doc(data.id).ref;
                        step_4 = this.afs.collection('Ambulances').doc(data.ambulance_id).ref;
                        step_5 = this.afs.collection('Users').doc(data.driver_id).ref;
                        batch.update(step_1, { 'state': 'finalized', 'who_finished': 'user' });
                        batch.set(step_2, { 'id': data.id, 'driver_id': data.driver_id });
                        batch.delete(step_3);
                        batch.update(step_4, { 'is_free': true, 'driver_id': data.driver_id, 'order_id': data.id });
                        batch.update(step_4, { 'is_free': true });
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.updateSendAmbulance = function (id, arrived, canceled) {
        return this.afs.collection("SendAmbulances").doc(id).update({
            is_arrived: arrived,
            is_canceled: canceled,
            who_canceled: 'user',
        });
    };
    // Oxyn Recgargue
    DatabaseService.prototype.addOxygenRecharge = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var batch, step_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Recarga_Oxigeno_Proceso').doc(uid).ref;
                        batch.set(step_1, data);
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getOxygenRechargeById = function (id) {
        return this.afs.collection('Recarga_Oxigeno_Proceso').doc(id).valueChanges();
    };
    DatabaseService.prototype.cancelOxygenRecharge = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var old_id, codigo, batch, step_1, step_2, step_3, step_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        old_id = data.id;
                        codigo = this.afs.createId();
                        data.id = codigo;
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Recarga_Oxigeno_Proceso').doc(old_id).ref;
                        batch.delete(step_1);
                        step_2 = this.afs.collection('Recarga_Oxigeno_Cancelados').doc(codigo).ref;
                        batch.set(step_2, data);
                        step_3 = this.afs.collection('Usuario_Cancelados').doc(old_id).collection("Recarga_Oxigeno").doc(codigo).ref;
                        batch.set(step_3, { 'id': codigo });
                        step_4 = this.afs.collection('Admin_Canceladas').doc("Recarga_Oxigeno").collection(moment().format('YYYY[-]MM')).doc(codigo).ref;
                        batch.set(step_4, { 'id': codigo });
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getOxygenRechargeCanceladoByKey = function (id) {
        return this.afs.collection('Recarga_Oxigeno_Cancelados').doc(id).valueChanges();
    };
    DatabaseService.prototype.getOxygenRechargeCanceled = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Cancelados").doc(id).collection("Recarga_Oxigeno");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getOxygenRechargeCanceladoByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.getOxygenRechargeFinalizadosByKey = function (id) {
        return this.afs.collection('Recarga_Oxigeno_Finalizados').doc(id).valueChanges();
    };
    DatabaseService.prototype.getOxygenRechargeFinalizados = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Finalizados").doc(id).collection("Recarga_Oxigeno");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getOxygenRechargeFinalizadosByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.updateOxygenRecharge = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.afs.collection('Recarga_Oxigeno_Proceso').doc(uid).update(data)];
            });
        });
    };
    // AdsMaterial
    DatabaseService.prototype.addADSMaterial = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var batch, step_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Material_Publicitario_Proceso').doc(uid).ref;
                        batch.set(step_1, data);
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getADSMaterialById = function (id) {
        return this.afs.collection('Material_Publicitario_Proceso').doc(id).valueChanges();
    };
    DatabaseService.prototype.cancelADSMaterial = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var old_id, codigo, batch, step_1, step_2, step_3, step_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        old_id = data.id;
                        codigo = this.afs.createId();
                        data.id = codigo;
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Material_Publicitario_Proceso').doc(old_id).ref;
                        batch.delete(step_1);
                        step_2 = this.afs.collection('Material_Publicitario_Cancelados').doc(codigo).ref;
                        batch.set(step_2, data);
                        step_3 = this.afs.collection('Usuario_Cancelados').doc(old_id).collection("Material_Publicitario").doc(codigo).ref;
                        batch.set(step_3, { 'id': codigo });
                        step_4 = this.afs.collection('Admin_Canceladas').doc("Material_Publicitario").collection(moment().format('YYYY[-]MM')).doc(codigo).ref;
                        batch.set(step_4, { 'id': codigo });
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getADSMaterialCanceladoByKey = function (id) {
        return this.afs.collection('Material_Publicitario_Cancelados').doc(id).valueChanges();
    };
    DatabaseService.prototype.getADSMaterialCanceled = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Cancelados").doc(id).collection("Material_Publicitario");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getADSMaterialCanceladoByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.getADSMaterialFinalizadosByKey = function (id) {
        return this.afs.collection('Material_Publicitario_Finalizados').doc(id).valueChanges();
    };
    DatabaseService.prototype.getADSMaterialFinalizados = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Finalizados").doc(id).collection("Material_Publicitario");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getADSMaterialFinalizadosByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.updateADSMaterial = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.afs.collection('Material_Publicitario_Proceso').doc(uid).update(data)];
            });
        });
    };
    // Trainings
    DatabaseService.prototype.addTrainings = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var batch, step_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Capacitaciones_Proceso').doc(uid).ref;
                        batch.set(step_1, data);
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getTrainingsById = function (id) {
        return this.afs.collection('Capacitaciones_Proceso').doc(id).valueChanges();
    };
    DatabaseService.prototype.cancelTrainings = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var old_id, codigo, batch, step_1, step_2, step_3, step_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        old_id = data.id;
                        codigo = this.afs.createId();
                        data.id = codigo;
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Capacitaciones_Proceso').doc(old_id).ref;
                        batch.delete(step_1);
                        step_2 = this.afs.collection('Capacitaciones_Canceladas').doc(codigo).ref;
                        batch.set(step_2, data);
                        step_3 = this.afs.collection('Usuario_Cancelados').doc(old_id).collection("Capacitaciones").doc(codigo).ref;
                        batch.set(step_3, { 'id': codigo });
                        step_4 = this.afs.collection('Admin_Canceladas').doc("Capacitaciones").collection(moment().format('YYYY[-]MM')).doc(codigo).ref;
                        batch.set(step_4, { 'id': codigo });
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getTrainingsCanceladoByKey = function (id) {
        return this.afs.collection('Capacitaciones_Canceladas').doc(id).valueChanges();
    };
    DatabaseService.prototype.getTrainingsCanceled = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Cancelados").doc(id).collection("Capacitaciones");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getTrainingsCanceladoByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.getTrainingsFinalizadosByKey = function (id) {
        return this.afs.collection('Capacitaciones_Finalizadas').doc(id).valueChanges();
    };
    DatabaseService.prototype.getTrainingsFinalizados = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Finalizados").doc(id).collection("Capacitaciones");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getTrainingsFinalizadosByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.updateTrainings = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.afs.collection('Capacitaciones_Proceso').doc(uid).update(data)];
            });
        });
    };
    // Visits
    DatabaseService.prototype.addVisits = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var batch, step_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Visitas_Proceso').doc(uid).ref;
                        batch.set(step_1, data);
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getVisitsById = function (id) {
        return this.afs.collection('Visitas_Proceso').doc(id).valueChanges();
    };
    DatabaseService.prototype.cancelVisits = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var old_id, codigo, batch, step_1, step_2, step_3, step_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        old_id = data.id;
                        codigo = this.afs.createId();
                        data.id = codigo;
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Visitas_Proceso').doc(old_id).ref;
                        batch.delete(step_1);
                        step_2 = this.afs.collection('Visitas_Canceladas').doc(codigo).ref;
                        batch.set(step_2, data);
                        step_3 = this.afs.collection('Usuario_Cancelados').doc(old_id).collection("Visitas").doc(codigo).ref;
                        batch.set(step_3, { 'id': codigo });
                        step_4 = this.afs.collection('Admin_Canceladas').doc("Visitas").collection(moment().format('YYYY[-]MM')).doc(codigo).ref;
                        batch.set(step_4, { 'id': codigo });
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getVisitsCanceladoByKey = function (id) {
        return this.afs.collection('Visitas_Canceladas').doc(id).valueChanges();
    };
    DatabaseService.prototype.getVisitsCanceled = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Cancelados").doc(id).collection("Visitas");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getVisitsCanceladoByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.getVisitsFinalizadosByKey = function (id) {
        return this.afs.collection('Visitas_Finalizadas').doc(id).valueChanges();
    };
    DatabaseService.prototype.getVisitsFinalizados = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Finalizados").doc(id).collection("Visitas");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getVisitsFinalizadosByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.updateVisits = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.afs.collection('Visitas_Proceso').doc(uid).update(data)];
            });
        });
    };
    // MedicalKit
    DatabaseService.prototype.addMedicalKit = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var batch, step_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Botiquin_Proceso').doc(uid).ref;
                        batch.set(step_1, data);
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getMedicalKitById = function (id) {
        return this.afs.collection('Botiquin_Proceso').doc(id).valueChanges();
    };
    DatabaseService.prototype.cancelMedicalKit = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var old_id, codigo, batch, step_1, step_2, step_3, step_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        old_id = data.id;
                        codigo = this.afs.createId();
                        data.id = codigo;
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Botiquin_Proceso').doc(old_id).ref;
                        batch.delete(step_1);
                        step_2 = this.afs.collection('Botiquin_Cancelados').doc(codigo).ref;
                        batch.set(step_2, data);
                        step_3 = this.afs.collection('Usuario_Cancelados').doc(old_id).collection("Botiquin").doc(codigo).ref;
                        batch.set(step_3, { 'id': codigo });
                        step_4 = this.afs.collection('Admin_Canceladas').doc("Botiquin").collection(moment().format('YYYY[-]MM')).doc(codigo).ref;
                        batch.set(step_4, { 'id': codigo });
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getMedicalKitCanceladoByKey = function (id) {
        return this.afs.collection('Botiquin_Cancelados').doc(id).valueChanges();
    };
    DatabaseService.prototype.getMedicalKitCanceled = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Cancelados").doc(id).collection("Botiquin");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getMedicalKitCanceladoByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.getMedicalKitFinalizadosByKey = function (id) {
        return this.afs.collection('Botiquin_Finalizados').doc(id).valueChanges();
    };
    DatabaseService.prototype.getMedicalKitFinalizados = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Finalizados").doc(id).collection("Botiquin");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getMedicalKitFinalizadosByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.updateMedicalKit = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.afs.collection('Botiquin_Proceso').doc(uid).update(data)];
            });
        });
    };
    // OccupationalExam
    DatabaseService.prototype.addOccupationalExam = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var batch, step_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Examen_Ocupacional_Proceso').doc(uid).ref;
                        batch.set(step_1, data);
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getOccupationalExamById = function (id) {
        return this.afs.collection('Examen_Ocupacional_Proceso').doc(id).valueChanges();
    };
    DatabaseService.prototype.cancelOccupationalExam = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var old_id, codigo, batch, step_1, step_2, step_3, step_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        old_id = data.id;
                        codigo = this.afs.createId();
                        data.id = codigo;
                        batch = this.afs.firestore.batch();
                        step_1 = this.afs.collection('Examen_Ocupacional_Proceso').doc(old_id).ref;
                        batch.delete(step_1);
                        step_2 = this.afs.collection('Examen_Ocupacional_Cancelados').doc(codigo).ref;
                        batch.set(step_2, data);
                        step_3 = this.afs.collection('Usuario_Cancelados').doc(old_id).collection("Examen_Ocupacional").doc(codigo).ref;
                        batch.set(step_3, { 'id': codigo });
                        step_4 = this.afs.collection('Admin_Canceladas').doc("Examen_Ocupacional").collection(moment().format('YYYY[-]MM')).doc(codigo).ref;
                        batch.set(step_4, { 'id': codigo });
                        return [4 /*yield*/, batch.commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseService.prototype.getOccupationalExamCanceladoByKey = function (id) {
        return this.afs.collection('Examen_Ocupacional_Cancelados').doc(id).valueChanges();
    };
    DatabaseService.prototype.getOccupationalExamCanceled = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Cancelados").doc(id).collection("Examen_Ocupacional");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getOccupationalExamCanceladoByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.getOccupationalExamFinalizadosByKey = function (id) {
        return this.afs.collection('Examen_Ocupacional_Finalizados').doc(id).valueChanges();
    };
    DatabaseService.prototype.getOccupationalExamFinalizados = function (id) {
        var _this = this;
        var collection = this.afs.collection("Usuario_Finalizados").doc(id).collection("Examen_Ocupacional");
        return collection.snapshotChanges().pipe(map(function (refReferencias) {
            if (refReferencias.length > 0) {
                return refReferencias.map(function (refReferencia) {
                    var data = refReferencia.payload.doc.data();
                    return _this.getOccupationalExamFinalizadosByKey(data.id).pipe(map(function (dataGeneral) { return Object.assign({}, { data: data, dataGeneral: dataGeneral }); }));
                });
            }
        })).mergeMap(function (observables) {
            if (observables) {
                return combineLatest(observables);
            }
            else {
                return of([]);
            }
        });
    };
    DatabaseService.prototype.updateOccupationalExam = function (uid, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.afs.collection('Examen_Ocupacional_Proceso').doc(uid).update(data)];
            });
        });
    };
    DatabaseService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore])
    ], DatabaseService);
    return DatabaseService;
}());
export { DatabaseService };
//# sourceMappingURL=database.service.js.map