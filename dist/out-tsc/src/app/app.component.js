import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { DatabaseService } from './services/database.service';
import { StorageService } from './services/storage.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
// OneSignal
import { OneSignal } from '@ionic-native/onesignal/ngx';
import * as moment from 'moment';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, navCtrl, oneSignal, auth, alertController, database, socialSharing, device, appVersion, storage, toastController) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.navCtrl = navCtrl;
        this.oneSignal = oneSignal;
        this.auth = auth;
        this.alertController = alertController;
        this.database = database;
        this.socialSharing = socialSharing;
        this.device = device;
        this.appVersion = appVersion;
        this.storage = storage;
        this.toastController = toastController;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.initNotification();
            if (_this.platform.is('android')) {
                _this.statusBar.overlaysWebView(false);
                _this.statusBar.backgroundColorByHexString('#000000');
            }
            moment.locale('es');
        });
    };
    AppComponent.prototype.initNotification = function () {
        var _this = this;
        this.oneSignal.startInit('f62ec6a9-740d-4840-9149-bf759347ce60', '727960214488');
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationOpened().subscribe(function (jsonData) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clave, destino, alert_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clave = jsonData.notification.payload.additionalData.clave;
                        destino = JSON.parse(jsonData.notification.payload.additionalData.destino);
                        if (!(destino.page === 'ambulancia')) return [3 /*break*/, 5];
                        if (!(destino.state === 'canceled')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                header: jsonData.notification.payload.title,
                                message: jsonData.notification.payload.body,
                                buttons: ['OK']
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.storage.setParams('params', {
                            id: clave
                        });
                        this.navCtrl.navigateForward('ambulance-check');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (destino.page === 'oxigeno') {
                            if (destino.state === 'approved') {
                                this.storage.setParams_v2({
                                    id: clave,
                                    state: 'created'
                                });
                                this.navCtrl.navigateForward('oxygen-recharge-check');
                            }
                        }
                        else if (destino.page === 'materia') {
                            if (destino.state === 'approved') {
                                this.storage.setParams_v2({
                                    id: clave,
                                    state: 'created'
                                });
                                this.navCtrl.navigateForward('ads-material-check');
                            }
                        }
                        else if (destino.page === 'capacitacion') {
                            if (destino.state === 'approved') {
                                this.storage.setParams_v2({
                                    id: clave,
                                    state: 'created'
                                });
                                this.navCtrl.navigateForward('trainings-check');
                            }
                        }
                        else if (destino.page === 'visita') {
                            if (destino.state === 'approved') {
                                this.storage.setParams_v2({
                                    id: clave,
                                    state: 'created'
                                });
                                this.navCtrl.navigateForward('visits-check');
                            }
                        }
                        else if (destino.page === 'botiquin') {
                            if (destino.state === 'approved') {
                                this.storage.setParams_v2({
                                    id: clave,
                                    state: 'created'
                                });
                                this.navCtrl.navigateForward('medical-kit-check');
                            }
                        }
                        else if (destino.page === 'examen') {
                            if (destino.state === 'approved') {
                                this.storage.setParams_v2({
                                    id: clave,
                                    state: 'created'
                                });
                                this.navCtrl.navigateForward('occupational-exam-check');
                            }
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        this.oneSignal.handleNotificationReceived().subscribe(function (jsonData) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clave, destino, alert_2, alert_3, alert_4, alert_5, alert_6, alert_7, alert_8, alert_9;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(jsonData);
                        clave = jsonData.payload.additionalData.clave;
                        destino = JSON.parse(jsonData.payload.additionalData.destino);
                        if (!(destino.page === 'ambulancia')) return [3 /*break*/, 7];
                        if (!(destino.state === 'canceled')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                header: jsonData.payload.title,
                                message: jsonData.payload.body,
                                buttons: ['OK']
                            })];
                    case 1:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.alertController.create({
                            header: jsonData.payload.title,
                            message: jsonData.payload.body,
                            buttons: [
                                {
                                    text: 'Ok',
                                    role: 'cancel',
                                    handler: function (blah) {
                                    }
                                }, {
                                    text: 'Ver pedido',
                                    handler: function () {
                                        _this.storage.setParams('params', {
                                            id: clave
                                        });
                                        _this.navCtrl.navigateForward('ambulance-check');
                                    }
                                }
                            ]
                        })];
                    case 4:
                        alert_3 = _a.sent();
                        return [4 /*yield*/, alert_3.present()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 30];
                    case 7:
                        if (!(destino.page === 'oxigeno')) return [3 /*break*/, 11];
                        if (!(destino.state === 'approved')) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.alertController.create({
                                header: jsonData.payload.title,
                                message: jsonData.payload.body,
                                buttons: [
                                    {
                                        text: 'Ok',
                                        role: 'cancel',
                                        handler: function (blah) {
                                        }
                                    }, {
                                        text: 'Ver pedido',
                                        handler: function () {
                                            _this.storage.setParams_v2({
                                                id: clave,
                                                state: 'created'
                                            });
                                            _this.navCtrl.navigateForward('oxygen-recharge-check');
                                        }
                                    }
                                ]
                            })];
                    case 8:
                        alert_4 = _a.sent();
                        return [4 /*yield*/, alert_4.present()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [3 /*break*/, 30];
                    case 11:
                        if (!(destino.page === 'materia')) return [3 /*break*/, 15];
                        if (!(destino.state === 'approved')) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.alertController.create({
                                header: jsonData.payload.title,
                                message: jsonData.payload.body,
                                buttons: [
                                    {
                                        text: 'Ok',
                                        role: 'cancel',
                                        handler: function (blah) {
                                        }
                                    }, {
                                        text: 'Ver pedido',
                                        handler: function () {
                                            _this.storage.setParams_v2({
                                                id: clave,
                                                state: 'created'
                                            });
                                            _this.navCtrl.navigateForward('ads-material-check');
                                        }
                                    }
                                ]
                            })];
                    case 12:
                        alert_5 = _a.sent();
                        return [4 /*yield*/, alert_5.present()];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14: return [3 /*break*/, 30];
                    case 15:
                        if (!(destino.page === 'capacitacion')) return [3 /*break*/, 19];
                        if (!(destino.state === 'approved')) return [3 /*break*/, 18];
                        return [4 /*yield*/, this.alertController.create({
                                header: jsonData.payload.title,
                                message: jsonData.payload.body,
                                buttons: [
                                    {
                                        text: 'Ok',
                                        role: 'cancel',
                                        handler: function (blah) {
                                        }
                                    }, {
                                        text: 'Ver pedido',
                                        handler: function () {
                                            _this.storage.setParams_v2({
                                                id: clave,
                                                state: 'created'
                                            });
                                            _this.navCtrl.navigateForward('trainings-check');
                                        }
                                    }
                                ]
                            })];
                    case 16:
                        alert_6 = _a.sent();
                        return [4 /*yield*/, alert_6.present()];
                    case 17:
                        _a.sent();
                        _a.label = 18;
                    case 18: return [3 /*break*/, 30];
                    case 19:
                        if (!(destino.page === 'visita')) return [3 /*break*/, 23];
                        if (!(destino.state === 'approved')) return [3 /*break*/, 22];
                        return [4 /*yield*/, this.alertController.create({
                                header: jsonData.payload.title,
                                message: jsonData.payload.body,
                                buttons: [
                                    {
                                        text: 'Ok',
                                        role: 'cancel',
                                        handler: function (blah) {
                                        }
                                    }, {
                                        text: 'Ver pedido',
                                        handler: function () {
                                            _this.storage.setParams_v2({
                                                id: clave,
                                                state: 'created'
                                            });
                                            _this.navCtrl.navigateForward('visits-check');
                                        }
                                    }
                                ]
                            })];
                    case 20:
                        alert_7 = _a.sent();
                        return [4 /*yield*/, alert_7.present()];
                    case 21:
                        _a.sent();
                        _a.label = 22;
                    case 22: return [3 /*break*/, 30];
                    case 23:
                        if (!(destino.page === 'botiquin')) return [3 /*break*/, 27];
                        if (!(destino.state === 'approved')) return [3 /*break*/, 26];
                        return [4 /*yield*/, this.alertController.create({
                                header: jsonData.payload.title,
                                message: jsonData.payload.body,
                                buttons: [
                                    {
                                        text: 'Ok',
                                        role: 'cancel',
                                        handler: function (blah) {
                                        }
                                    }, {
                                        text: 'Ver pedido',
                                        handler: function () {
                                            _this.storage.setParams_v2({
                                                id: clave,
                                                state: 'created'
                                            });
                                            _this.navCtrl.navigateForward('medical-kit-check');
                                        }
                                    }
                                ]
                            })];
                    case 24:
                        alert_8 = _a.sent();
                        return [4 /*yield*/, alert_8.present()];
                    case 25:
                        _a.sent();
                        _a.label = 26;
                    case 26: return [3 /*break*/, 30];
                    case 27:
                        if (!(destino.page === 'examen')) return [3 /*break*/, 30];
                        if (!(destino.state === 'approved')) return [3 /*break*/, 30];
                        return [4 /*yield*/, this.alertController.create({
                                header: jsonData.payload.title,
                                message: jsonData.payload.body,
                                buttons: [
                                    {
                                        text: 'Ok',
                                        role: 'cancel',
                                        handler: function (blah) {
                                        }
                                    }, {
                                        text: 'Ver pedido',
                                        handler: function () {
                                            _this.storage.setParams_v2({
                                                id: clave,
                                                state: 'created'
                                            });
                                            _this.navCtrl.navigateForward('occupational-exam-check');
                                        }
                                    }
                                ]
                            })];
                    case 28:
                        alert_9 = _a.sent();
                        return [4 /*yield*/, alert_9.present()];
                    case 29:
                        _a.sent();
                        _a.label = 30;
                    case 30: return [2 /*return*/];
                }
            });
        }); });
        this.oneSignal.endInit();
        this.auth.is_logged().subscribe(function (user) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.oneSignal.getIds().then(function (oS) {
                    _this.storage.setValue("token_id", oS.userId);
                    if (user) {
                        _this.database.updateToken(user.uid, oS.userId);
                    }
                });
                return [2 /*return*/];
            });
        }); });
        this.oneSignal.getTags().then(function (data) {
            console.log(data);
        });
        this.oneSignal.sendTag("Partners", "true");
    };
    AppComponent.prototype.goAppointmentListPage = function () {
        this.navCtrl.navigateForward('appointment-list');
    };
    AppComponent.prototype.goOrders = function () {
        this.navCtrl.navigateForward('orders');
    };
    AppComponent.prototype.salir = function () {
        this.auth.signOut();
    };
    AppComponent.prototype.reportIssue = function () {
        var _this = this;
        this.appVersion.getVersionNumber().then(function (app_version) {
            var body = '- Describe el error<br>' +
                'Una descripción clara y concisa de lo que es el error.<br><br>' +
                '- Reproducir<br>' +
                '1. Ir a "..."<br>' +
                '2. Haga clic en "..."<br>' +
                '3. Desplácese hacia abajo hasta "..."<br>' +
                '4. Ver error<br><br>' +
                '- Mensaje adicional<br>' +
                'Agregue cualquier otro mensaje sobre el problema aquí.<br><br>' +
                '- Información técnica<br>' +
                'Modelo de dispositivo: ' + _this.device.model + '<br>' +
                'Versión: ' + _this.device.version + '<br>' +
                'Version de aplicacion: ' + app_version + '<br>';
            var subject = "Informe de error";
            _this.socialSharing.shareViaEmail(body, subject, ['puntoproapp@gmail.com'])
                .then(function () {
                // OK
            }).catch(function () {
                // Error!
            });
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            NavController,
            OneSignal,
            AuthService,
            AlertController,
            DatabaseService,
            SocialSharing,
            Device,
            AppVersion,
            StorageService,
            ToastController])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map