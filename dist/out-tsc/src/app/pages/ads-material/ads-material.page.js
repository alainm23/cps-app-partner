import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
var AdsMaterialPage = /** @class */ (function () {
    function AdsMaterialPage(navCtrl, alertController, events, database, auth, api, storage, loadingController) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.events = events;
        this.database = database;
        this.auth = auth;
        this.api = api;
        this.storage = storage;
        this.loadingController = loadingController;
        this.is_edit = false;
        this.item_01 = false;
        this.item_02 = false;
        this.item_03 = false;
        this.item_04 = false;
        this.item_05 = false;
        this.item_06 = false;
        this.item_07 = false;
        this.item_08 = false;
        this.color = "white";
        this.color_selected = "blue";
        this.color_01 = this.color;
        this.color_02 = this.color;
        this.color_03 = this.color;
        this.color_04 = this.color;
        this.color_05 = this.color;
        this.color_06 = this.color;
        this.color_07 = this.color;
        this.color_08 = this.color;
    }
    AdsMaterialPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getParams_2().then(function (data) {
            var params = JSON.parse(data);
            if (params.edit === true) {
                _this.is_edit = true;
                _this.database.getADSMaterialById(params.id).subscribe(function (data) {
                    if (data) {
                        _this.item_01 = data.mapas;
                        _this.item_02 = data.portafiles;
                        _this.item_03 = data.lapiceros;
                        _this.item_04 = data.blocks;
                        _this.item_05 = data.ambientador;
                        _this.item_06 = data.agenda;
                        _this.item_07 = data.calendarios;
                        _this.item_08 = data.tableros;
                        _this.check_toggle();
                    }
                });
            }
        });
    };
    AdsMaterialPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    AdsMaterialPage.prototype.check_toggle = function () {
        if (this.item_01) {
            this.item_01 = true;
            this.color_01 = this.color_selected;
        }
        if (this.item_02) {
            this.item_02 = true;
            this.color_02 = this.color_selected;
        }
        if (this.item_03) {
            this.item_03 = true;
            this.color_03 = this.color_selected;
        }
        if (this.item_04) {
            this.item_04 = true;
            this.color_04 = this.color_selected;
        }
        if (this.item_05) {
            this.item_05 = true;
            this.color_05 = this.color_selected;
        }
        if (this.item_06) {
            this.item_06 = true;
            this.color_06 = this.color_selected;
        }
        if (this.item_07) {
            this.item_07 = true;
            this.color_07 = this.color_selected;
        }
        if (this.item_08) {
            this.item_08 = true;
            this.color_08 = this.color_selected;
        }
    };
    AdsMaterialPage.prototype.change_value = function (val) {
        if (val === 1) {
            if (this.item_01) {
                this.item_01 = false;
                this.color_01 = this.color;
            }
            else {
                this.item_01 = true;
                this.color_01 = this.color_selected;
            }
        }
        else if (val === 2) {
            if (this.item_02) {
                this.item_02 = false;
                this.color_02 = this.color;
            }
            else {
                this.item_02 = true;
                this.color_02 = this.color_selected;
            }
        }
        else if (val === 3) {
            if (this.item_03) {
                this.item_03 = false;
                this.color_03 = this.color;
            }
            else {
                this.item_03 = true;
                this.color_03 = this.color_selected;
            }
        }
        else if (val === 4) {
            if (this.item_04) {
                this.item_04 = false;
                this.color_04 = this.color;
            }
            else {
                this.item_04 = true;
                this.color_04 = this.color_selected;
            }
        }
        else if (val === 5) {
            if (this.item_05) {
                this.item_05 = false;
                this.color_05 = this.color;
            }
            else {
                this.item_05 = true;
                this.color_05 = this.color_selected;
            }
        }
        else if (val === 6) {
            if (this.item_06) {
                this.item_06 = false;
                this.color_06 = this.color;
            }
            else {
                this.item_06 = true;
                this.color_06 = this.color_selected;
            }
        }
        else if (val === 7) {
            if (this.item_07) {
                this.item_07 = false;
                this.color_07 = this.color;
            }
            else {
                this.item_07 = true;
                this.color_07 = this.color_selected;
            }
        }
        else if (val === 8) {
            if (this.item_08) {
                this.item_08 = false;
                this.color_08 = this.color;
            }
            else {
                this.item_08 = true;
                this.color_08 = this.color_selected;
            }
        }
    };
    AdsMaterialPage.prototype.submit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert_1, loading_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.item_01 === false && this.item_02 === false &&
                            this.item_03 === false && this.item_04 === false &&
                            this.item_05 === false && this.item_06 === false &&
                            this.item_07 === false && this.item_08 === false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                header: 'Ninguna opcion seleccionada',
                                message: 'Tiene que marcar almenos una opcion.',
                                buttons: ['OK']
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.loadingController.create({
                            message: 'Tu solicitud está en procesando... espere un momento'
                        })];
                    case 4:
                        loading_1 = _a.sent();
                        return [4 /*yield*/, loading_1.present()];
                    case 5:
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
                                                    mapas: this.item_01,
                                                    portafiles: this.item_02,
                                                    lapiceros: this.item_03,
                                                    blocks: this.item_04,
                                                    ambientador: this.item_05,
                                                    agenda: this.item_06,
                                                    calendarios: this.item_07,
                                                    tableros: this.item_08,
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
                                                return [4 /*yield*/, this.database.updateADSMaterial(uid, data)];
                                            case 1:
                                                _a.sent();
                                                push_data = {
                                                    titulo: 'Partner - Pedido de material publicitario',
                                                    detalle: 'Un pedido de material publicitario fue solicitado',
                                                    destino: 'material',
                                                    mode: 'tags',
                                                    clave: uid,
                                                    tokens: 'Administrador'
                                                };
                                                this.api.pushNotification(push_data).subscribe(function (response) {
                                                    console.log("Notificacion Enviada...", response);
                                                    loading_1.dismiss();
                                                    _this.goHome();
                                                }, function (error) {
                                                    console.log("Notificacion Error...", error);
                                                    loading_1.dismiss();
                                                    _this.goHome();
                                                });
                                                return [3 /*break*/, 4];
                                            case 2: return [4 /*yield*/, this.database.addADSMaterial(uid, data)];
                                            case 3:
                                                _a.sent();
                                                push_data = {
                                                    titulo: 'Partner - Pedido de material publicitario',
                                                    detalle: 'Un pedido de material publicitario fue solicitado',
                                                    destino: 'material',
                                                    mode: 'tags',
                                                    clave: uid,
                                                    tokens: 'Administrador'
                                                };
                                                this.api.pushNotification(push_data).subscribe(function (response) {
                                                    console.log("Notificacion Enviada...", response);
                                                    loading_1.dismiss();
                                                    _this.goHome();
                                                }, function (error) {
                                                    console.log("Notificacion Error...", error);
                                                    loading_1.dismiss();
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
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AdsMaterialPage = tslib_1.__decorate([
        Component({
            selector: 'app-ads-material',
            templateUrl: './ads-material.page.html',
            styleUrls: ['./ads-material.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            Events,
            DatabaseService,
            AuthService,
            ApiService,
            StorageService,
            LoadingController])
    ], AdsMaterialPage);
    return AdsMaterialPage;
}());
export { AdsMaterialPage };
//# sourceMappingURL=ads-material.page.js.map