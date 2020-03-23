import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Events } from '@ionic/angular';
import { NavController, Platform, LoadingController, AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
var EmergencyPage = /** @class */ (function () {
    function EmergencyPage(navCtrl, alertController, events, database, storage, loadingController, api, auth, appAvailability, platform, payment, callNumber, socialSharing) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.events = events;
        this.database = database;
        this.storage = storage;
        this.loadingController = loadingController;
        this.api = api;
        this.auth = auth;
        this.appAvailability = appAvailability;
        this.platform = platform;
        this.payment = payment;
        this.callNumber = callNumber;
        this.socialSharing = socialSharing;
    }
    EmergencyPage.prototype.ngOnInit = function () {
        this.form = new FormGroup({
            fullname: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone_number: new FormControl('', [
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(9)
            ]),
            message: new FormControl('', Validators.required)
        });
    };
    EmergencyPage.prototype.submit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, value, data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Procesando informacion...'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        value = this.form.value;
                        data = {
                            idioma: 'es',
                            nombres: value.fullname,
                            email: value.email,
                            telefono: value.phone_number,
                            mensaje: value.message
                        };
                        this.api.sendMessage(data).subscribe(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var alert_1, alert_2;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(response.estado === 1)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this.alertController.create({
                                                header: 'Exito!!!',
                                                message: response.mensaje,
                                                buttons: ['OK']
                                            })];
                                    case 1:
                                        alert_1 = _a.sent();
                                        return [4 /*yield*/, alert_1.present()];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 6];
                                    case 3: return [4 /*yield*/, this.alertController.create({
                                            header: 'Error!!!',
                                            message: response.mensaje,
                                            buttons: ['OK']
                                        })];
                                    case 4:
                                        alert_2 = _a.sent();
                                        return [4 /*yield*/, alert_2.present()];
                                    case 5:
                                        _a.sent();
                                        _a.label = 6;
                                    case 6:
                                        loading.dismiss();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, function (error) {
                            loading.dismiss();
                            console.log(error);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    EmergencyPage.prototype.goSendAmbulance = function () {
        this.navCtrl.navigateForward('ambulance');
    };
    EmergencyPage.prototype.callNow = function () {
        this.callNumber.callNumber("+51989316622", true)
            .then(function (res) {
            console.log('Launched dialer!', res);
        })
            .catch(function (err) {
            console.log('Error launching dialer', err);
        });
    };
    EmergencyPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    EmergencyPage.prototype.chatWhatsapp = function () {
        var _this = this;
        this.socialSharing.shareViaWhatsAppToReceiver('+51989316622', '')
            .then(function () {
        })
            .catch(function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Aplicacion no encontrada!!!',
                            message: 'Instale WhatsApp Messenger',
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    EmergencyPage.prototype.sendSMS = function () {
        this.socialSharing.shareViaSMS('', '+51989316622')
            .then(function () {
        })
            .catch(function (error) {
            console.log('SMS error', error);
        });
    };
    EmergencyPage.prototype.chatMessenger = function () {
        var _this = this;
        var app;
        if (this.platform.is('ios')) {
            app = 'messenger://';
        }
        else if (this.platform.is('android')) {
            app = 'com.facebook.orca';
        }
        this.appAvailability.check(app).then(function (yes) {
            location.href = "https://www.messenger.com/t/clinica.peruanosuiza";
        }, function (no) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Aplicacion no encontrada!!!',
                            message: 'Instale Facebook Messenger',
                            buttons: ['OK']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    EmergencyPage = tslib_1.__decorate([
        Component({
            selector: 'app-emergency',
            templateUrl: './emergency.page.html',
            styleUrls: ['./emergency.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            Events,
            DatabaseService,
            StorageService,
            LoadingController,
            ApiService,
            AuthService,
            AppAvailability,
            Platform,
            PaymentService,
            CallNumber,
            SocialSharing])
    ], EmergencyPage);
    return EmergencyPage;
}());
export { EmergencyPage };
//# sourceMappingURL=emergency.page.js.map