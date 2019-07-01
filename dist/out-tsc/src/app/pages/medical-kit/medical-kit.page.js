import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
var MedicalKitPage = /** @class */ (function () {
    function MedicalKitPage(navCtrl, alertController, events, database, auth, storage, api, loadingController) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.events = events;
        this.database = database;
        this.auth = auth;
        this.storage = storage;
        this.api = api;
        this.loadingController = loadingController;
        this.is_edit = false;
        this.item_01 = false;
        this.item_02 = false;
        this.color = "white";
        this.color_selected = "blue";
        this.color_01 = this.color;
        this.color_02 = this.color;
    }
    MedicalKitPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getParams_2().then(function (data) {
            var params = JSON.parse(data);
            if (params.edit === true) {
                _this.is_edit = true;
                _this.database.getMedicalKitById(params.id).subscribe(function (data) {
                    if (data) {
                        _this.item_01 = data.b_new;
                        _this.item_02 = data.b_add;
                        _this.check_toggle();
                    }
                });
            }
        });
    };
    MedicalKitPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    MedicalKitPage.prototype.check_toggle = function () {
        if (this.item_01) {
            this.item_01 = true;
            this.color_01 = this.color_selected;
            this.item_02 = false;
            this.color_02 = this.color;
        }
        else {
            this.item_01 = false;
            this.color_01 = this.color;
            this.item_02 = true;
            this.color_02 = this.color_selected;
        }
    };
    MedicalKitPage.prototype.change_value = function (val) {
        if (val === 1) {
            if (this.item_01) {
                this.item_01 = false;
                this.color_01 = this.color;
                this.item_02 = true;
                this.color_02 = this.color_selected;
            }
            else {
                this.item_01 = true;
                this.color_01 = this.color_selected;
                this.item_02 = false;
                this.color_02 = this.color;
            }
        }
        else if (val === 2) {
            if (this.item_02) {
                this.item_02 = false;
                this.color_02 = this.color;
                this.item_01 = true;
                this.color_01 = this.color_selected;
            }
            else {
                this.item_02 = true;
                this.color_02 = this.color_selected;
                this.item_01 = false;
                this.color_01 = this.color;
            }
        }
    };
    MedicalKitPage.prototype.submit = function () {
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
                                    var data, push_data, push_data;
                                    var _this = this;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                data = {
                                                    id: uid,
                                                    token_id: token_id,
                                                    b_new: this.item_01,
                                                    b_add: this.item_02,
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
                                                return [4 /*yield*/, this.database.updateMedicalKit(uid, data)];
                                            case 1:
                                                _a.sent();
                                                push_data = {
                                                    titulo: 'Partner - Pedido de botiquin',
                                                    detalle: 'Un pedido de botiquin fue solicitado',
                                                    destino: 'botiquin',
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
                                            case 2: return [4 /*yield*/, this.database.addMedicalKit(uid, data)];
                                            case 3:
                                                _a.sent();
                                                push_data = {
                                                    titulo: 'Partner - Pedido de botiquin',
                                                    detalle: 'Un pedido de botiquin fue solicitado',
                                                    destino: 'botiquin',
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
    MedicalKitPage = tslib_1.__decorate([
        Component({
            selector: 'app-medical-kit',
            templateUrl: './medical-kit.page.html',
            styleUrls: ['./medical-kit.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            Events,
            DatabaseService,
            AuthService,
            StorageService,
            ApiService,
            LoadingController])
    ], MedicalKitPage);
    return MedicalKitPage;
}());
export { MedicalKitPage };
//# sourceMappingURL=medical-kit.page.js.map