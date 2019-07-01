import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Events } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
var VisitsPage = /** @class */ (function () {
    function VisitsPage(navCtrl, alertController, events, database, auth, api, storage, loadingController) {
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
    VisitsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.form = new FormGroup({
            subject: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required),
            hour: new FormControl('', Validators.required),
            contact_phone_number: new FormControl('', Validators.required)
        });
        this.storage.getParams_2().then(function (data) {
            var params = JSON.parse(data);
            if (params.edit === true) {
                _this.is_edit = true;
                _this.database.getVisitsById(params.id).subscribe(function (data) {
                    if (data) {
                        _this.form.controls['subject'].setValue(data.subject);
                        _this.form.controls['date'].setValue(data.date);
                        _this.form.controls['hour'].setValue(data.hour);
                        _this.form.controls['contact_phone_number'].setValue(data.contact_phone_number);
                    }
                });
            }
        });
    };
    VisitsPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    VisitsPage.prototype.submit = function () {
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
                                                    subject: value.subject,
                                                    date: value.date,
                                                    hour: value.hour,
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
                                                return [4 /*yield*/, this.database.updateVisits(uid, data)];
                                            case 1:
                                                _a.sent();
                                                push_data = {
                                                    titulo: 'Partner - Pedido de visita de representacion comercial',
                                                    detalle: 'Un pedido de visita de representacion comercial fue solicitado',
                                                    destino: 'visita',
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
                                            case 2: return [4 /*yield*/, this.database.addVisits(uid, data)];
                                            case 3:
                                                _a.sent();
                                                push_data = {
                                                    titulo: 'Partner - Pedido de visita de representacion comercial',
                                                    detalle: 'Un pedido de visita de representacion comercial fue solicitado',
                                                    destino: 'visita',
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
    VisitsPage.prototype.get_hours = function () {
        var list = [
            '17:00 - 18:00',
            '18:00 - 19:00',
            '19:00 - 20:00',
            '21:00 - 22:00'
        ];
        return list;
    };
    VisitsPage.prototype.check_hour = function (date) {
        var value = this.form.value;
        var date_selected = new Date(value.date);
        var now = new Date();
        if (date_selected > now) {
            return true;
        }
        else {
            var time = date.substring(0, 2);
            if ((now.getHours() + 2) > +time) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    VisitsPage = tslib_1.__decorate([
        Component({
            selector: 'app-visits',
            templateUrl: './visits.page.html',
            styleUrls: ['./visits.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            Events,
            DatabaseService,
            AuthService,
            ApiService,
            StorageService,
            LoadingController])
    ], VisitsPage);
    return VisitsPage;
}());
export { VisitsPage };
//# sourceMappingURL=visits.page.js.map