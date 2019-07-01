import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Events } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
var OccupationalExamPage = /** @class */ (function () {
    function OccupationalExamPage(navCtrl, alertController, events, database, auth, api, storage, loadingController) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.events = events;
        this.database = database;
        this.auth = auth;
        this.api = api;
        this.storage = storage;
        this.loadingController = loadingController;
        this.is_edit = false;
    }
    OccupationalExamPage.prototype.ngOnInit = function () {
        var _this = this;
        this.form = new FormGroup({
            contact_phone_number: new FormControl('', Validators.required),
            cantidad: new FormControl(null, Validators.required)
        });
        this.storage.getParams_2().then(function (data) {
            var params = JSON.parse(data);
            if (params.edit === true) {
                _this.is_edit = true;
                _this.database.getOccupationalExamById(params.id).subscribe(function (data) {
                    if (data) {
                        _this.form.controls['date'].setValue(data.date);
                        _this.form.controls['hour'].setValue(data.hour);
                        _this.form.controls['contact_phone_number'].setValue(data.contact_phone_number);
                        _this.form.controls['cantidad'].setValue(data.cantidad);
                    }
                });
            }
            else {
                _this.is_edit = false;
            }
        });
    };
    OccupationalExamPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    OccupationalExamPage.prototype.submit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Tu solicitud está en procesando... espere un momento'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.storage.getValue('uid').then(function (uid) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return tslib_1.__generator(this, function (_a) {
                                this.storage.getValue('token_id').then(function (token_id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var value, data, push_data, push_data;
                                    var _this = this;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                value = this.form.value;
                                                data = {
                                                    id: uid,
                                                    token_id: token_id,
                                                    cantidad: value.cantidad,
                                                    contact_phone_number: value.contact_phone_number,
                                                    created_date: new Date().toISOString(),
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
                                                if (!this.is_edit) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.database.updateOccupationalExam(uid, data)];
                                            case 1:
                                                _a.sent();
                                                push_data = {
                                                    titulo: 'Partner - Pedido de examen ocupacional',
                                                    detalle: 'Un pedido de examen ocupacional fue solicitado',
                                                    destino: 'examen',
                                                    mode: 'tags',
                                                    clave: uid,
                                                    tokens: 'Administrador'
                                                };
                                                this.api.pushNotification(push_data).subscribe(function (response) {
                                                    console.log("Notificacion Enviada...", response);
                                                    loading.dismiss();
                                                    _this.goHome();
                                                }, function (error) {
                                                    console.log("Notificacion Error...", error);
                                                    loading.dismiss();
                                                    _this.goHome();
                                                });
                                                return [3 /*break*/, 4];
                                            case 2: return [4 /*yield*/, this.database.addOccupationalExam(uid, data)];
                                            case 3:
                                                _a.sent();
                                                push_data = {
                                                    titulo: 'Partner - Pedido de examen ocupacional',
                                                    detalle: 'Un pedido de examen ocupacional fue solicitado',
                                                    destino: 'examen',
                                                    mode: 'tags',
                                                    clave: uid,
                                                    tokens: 'Administrador'
                                                };
                                                this.api.pushNotification(push_data).subscribe(function (response) {
                                                    console.log("Notificacion Enviada...", response);
                                                    loading.dismiss();
                                                    _this.goHome();
                                                }, function (error) {
                                                    console.log("Notificacion Error...", error);
                                                    loading.dismiss();
                                                    _this.goHome();
                                                });
                                                _a.label = 4;
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    OccupationalExamPage = tslib_1.__decorate([
        Component({
            selector: 'app-occupational-exam',
            templateUrl: './occupational-exam.page.html',
            styleUrls: ['./occupational-exam.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            Events,
            DatabaseService,
            AuthService,
            ApiService,
            StorageService,
            LoadingController])
    ], OccupationalExamPage);
    return OccupationalExamPage;
}());
export { OccupationalExamPage };
//# sourceMappingURL=occupational-exam.page.js.map