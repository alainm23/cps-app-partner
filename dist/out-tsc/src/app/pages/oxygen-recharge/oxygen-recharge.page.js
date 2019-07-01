import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Events } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
var OxygenRechargePage = /** @class */ (function () {
    function OxygenRechargePage(navCtrl, alertController, events, database, auth, api, storage, loadingController) {
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
    OxygenRechargePage.prototype.ngOnInit = function () {
        var _this = this;
        this.form = new FormGroup({
            oxygen_size: new FormControl('small', Validators.required),
            time: new FormControl('ahora', Validators.required)
        });
        this.storage.getParams_2().then(function (data) {
            var params = JSON.parse(data);
            if (params.edit === true) {
                _this.is_edit = true;
                _this.database.getOxygenRechargeById(params.id).subscribe(function (data) {
                    if (data) {
                        _this.form.controls["oxygen_size"].setValue(data.oxygen_size);
                        _this.form.controls["time"].setValue(data.time);
                    }
                });
            }
        });
    };
    OxygenRechargePage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    OxygenRechargePage.prototype.submit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var header, message, alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.is_edit) {
                            header = "Editar pedido";
                            message = "Esta seguro que quiere editar este pedido";
                        }
                        else {
                            header = "Solicitar";
                            message = "Esta seguro que quiere solicitar este pedido";
                        }
                        return [4 /*yield*/, this.alertController.create({
                                header: header,
                                message: message,
                                buttons: [
                                    {
                                        text: 'No',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function (blah) {
                                            console.log('Confirm Cancel: blah');
                                        }
                                    }, {
                                        text: 'Si',
                                        handler: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            var value, loading;
                                            var _this = this;
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        value = this.form.value;
                                                        return [4 /*yield*/, this.loadingController.create({
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
                                                                    var data, push_data, push_data;
                                                                    var _this = this;
                                                                    return tslib_1.__generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                data = {
                                                                                    id: uid,
                                                                                    token_id: token_id,
                                                                                    oxygen_size: value.oxygen_size,
                                                                                    time: value.time,
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
                                                                                    /*
                                                                                    price: 0,
                                                                                    delivery_price: 0,
                                                                                    delivery_time: 0,
                                                                                    is_checked: false,
                                                                                    is_paid: false,
                                                                                    is_sent: false,
                                                                                    
                                                                                    message: '',
                                                                                    payment_type: '', //online, cash,
                                                                                    
                                                                                    who_canceled: '',
                                                                                    who_canceled_name: '',
                                                                                    canceled_date: '',
                                                                                    arrived_date: '',
                                                                                    approved_date: '',
                                                                                    completed_date: '',
                                                                                    
                                                                                    tipo_comprobante: value.tipo_comprobante,
                                                                                    */
                                                                                };
                                                                                if (!this.is_edit) return [3 /*break*/, 2];
                                                                                return [4 /*yield*/, this.database.updateOxygenRecharge(uid, data)];
                                                                            case 1:
                                                                                _a.sent();
                                                                                push_data = {
                                                                                    titulo: 'Partner - Pedido de oxigeno',
                                                                                    detalle: 'Un pedido de oxigeno fue solicitado',
                                                                                    destino: 'oxigeno',
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
                                                                            case 2: return [4 /*yield*/, this.database.addOxygenRecharge(uid, data)];
                                                                            case 3:
                                                                                _a.sent();
                                                                                push_data = {
                                                                                    titulo: 'Partner - Pedido de oxigeno',
                                                                                    detalle: 'Un pedido de oxigeno fue solicitado',
                                                                                    destino: 'oxigeno',
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
                                        }); }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OxygenRechargePage = tslib_1.__decorate([
        Component({
            selector: 'app-oxygen-recharge',
            templateUrl: './oxygen-recharge.page.html',
            styleUrls: ['./oxygen-recharge.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            Events,
            DatabaseService,
            AuthService,
            ApiService,
            StorageService,
            LoadingController])
    ], OxygenRechargePage);
    return OxygenRechargePage;
}());
export { OxygenRechargePage };
//# sourceMappingURL=oxygen-recharge.page.js.map