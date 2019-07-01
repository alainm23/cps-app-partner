import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Events } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
// Ionic
import { ModalController } from '@ionic/angular';
// Modals
import { SelectCountriesPage } from '../../modals/select-countries/select-countries.page';
var TrainingsPage = /** @class */ (function () {
    function TrainingsPage(navCtrl, alertController, events, database, auth, api, modalCtrl, storage, loadingController) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.events = events;
        this.database = database;
        this.auth = auth;
        this.api = api;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.loadingController = loadingController;
        this.is_edit = false;
        this.item_01 = false;
        this.item_02 = false;
        this.item_03 = false;
        this.item_04 = false;
        this.color = "white";
        this.color_selected = "blue";
        this.color_01 = this.color;
        this.color_02 = this.color;
        this.color_03 = this.color;
        this.color_04 = this.color;
        this.pais_selected = {
            name: "Peru",
            dial_code: "+51",
            code: "PE"
        };
    }
    TrainingsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.form = new FormGroup({
            numero_personas: new FormControl('', [Validators.required]),
            date: new FormControl('', [Validators.required]),
            phone_number: new FormControl('', [Validators.required])
        });
        this.storage.getParams_2().then(function (data) {
            var params = JSON.parse(data);
            if (params.edit === true) {
                _this.is_edit = true;
                _this.database.getTrainingsById(params.id).subscribe(function (data) {
                    if (data) {
                        _this.item_01 = data.first_id;
                        _this.item_02 = data.emergency_brigade;
                        _this.item_03 = data.fire_extinguishers;
                        _this.item_04 = data.nutrition;
                        _this.check_toggle();
                    }
                });
            }
        });
    };
    TrainingsPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    TrainingsPage.prototype.check_toggle = function () {
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
    };
    TrainingsPage.prototype.change_value = function (val) {
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
    };
    TrainingsPage.prototype.submit = function () {
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
                                                    first_id: this.item_01,
                                                    emergency_brigade: this.item_02,
                                                    fire_extinguishers: this.item_03,
                                                    nutrition: this.item_04,
                                                    created_date: new Date().toISOString(),
                                                    ruc: this.auth.user.ruc,
                                                    user_phone_number: value.phone_number,
                                                    date: value.date,
                                                    numero_personas: value.numero_personas,
                                                    user_fullname: this.auth.user.fullname,
                                                    user_email: this.auth.user.email,
                                                    user_country_name: this.pais_selected.name,
                                                    user_country_dial_code: this.pais_selected.dial_code,
                                                    user_country_code: this.pais_selected.code,
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
                                                return [4 /*yield*/, this.database.updateTrainings(uid, data)];
                                            case 1:
                                                _a.sent();
                                                push_data = {
                                                    titulo: 'Partner - Pedido de capacitacion',
                                                    detalle: 'Un pedido de capacitacion fue solicitado',
                                                    destino: 'capacitacion',
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
                                            case 2: return [4 /*yield*/, this.database.addTrainings(uid, data)];
                                            case 3:
                                                _a.sent();
                                                push_data = {
                                                    titulo: 'Partner - Pedido de capacitacion',
                                                    detalle: 'Un pedido de capacitacion fue solicitado',
                                                    destino: 'capacitacion',
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
    TrainingsPage.prototype.getFlat = function () {
        return "https://www.countryflags.io/" + this.pais_selected.code + "/flat/24.png";
    };
    TrainingsPage.prototype.select_code = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: SelectCountriesPage,
                            mode: 'ios',
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (response) {
                            if (response.role == 'response') {
                                _this.pais_selected = response.data;
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TrainingsPage.prototype.checkValid = function () {
        return this.item_01 === false && this.item_02 === false &&
            this.item_03 === false && this.item_04 === false && this.form.valid === false;
    };
    TrainingsPage = tslib_1.__decorate([
        Component({
            selector: 'app-trainings',
            templateUrl: './trainings.page.html',
            styleUrls: ['./trainings.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            Events,
            DatabaseService,
            AuthService,
            ApiService,
            ModalController,
            StorageService,
            LoadingController])
    ], TrainingsPage);
    return TrainingsPage;
}());
export { TrainingsPage };
//# sourceMappingURL=trainings.page.js.map