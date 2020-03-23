import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(auth, loadingController, database, navCtrl, alertController) {
        this.auth = auth;
        this.loadingController = loadingController;
        this.database = database;
        this.navCtrl = navCtrl;
        this.alertController = alertController;
    }
    LoginPage.prototype.ngOnInit = function () {
        this.form = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    };
    LoginPage.prototype.onSubmit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, value;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Procesando Informacion ...'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        value = this.form.value;
                        this.auth.loginEmailPassword(value.email, value.password)
                            .then(function (response) {
                            _this.database.get_User_Partner(response.user.uid).subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var alert_1;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!data.is_active) return [3 /*break*/, 1];
                                            this.navCtrl.navigateRoot('/home');
                                            return [3 /*break*/, 4];
                                        case 1: return [4 /*yield*/, this.alertController.create({
                                                header: 'Opppps!',
                                                message: 'Su cuenta no tiene los privilegios necesarios...',
                                                buttons: ['OK']
                                            })];
                                        case 2:
                                            alert_1 = _a.sent();
                                            return [4 /*yield*/, alert_1.present().then(function () {
                                                    _this.auth.signOut();
                                                })];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4:
                                            loading.dismiss();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }, function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var errorMessage, alert;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        loading.dismiss();
                                        errorMessage = "";
                                        if (error.code == "auth/network-request-failed") {
                                            errorMessage = "No tienes acceso a internet, no se puede proceder.";
                                        }
                                        else if (error.code == "auth/user-not-found") {
                                            errorMessage = "No encontramos a nigun usuario con ese correo";
                                        }
                                        else if (error.code == "auth/wrong-password") {
                                            errorMessage = "Ingrese una contraseña valida";
                                        }
                                        else if (error.code == "auth/too-many-requests") {
                                            errorMessage = "Hemos bloqueado todas las solicitudes de este dispositivo debido a una actividad inusual. Inténtalo más tarde.";
                                        }
                                        else {
                                            errorMessage = error.message;
                                        }
                                        return [4 /*yield*/, this.alertController.create({
                                                header: 'Opppps!',
                                                message: errorMessage,
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
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            LoadingController,
            DatabaseService,
            NavController,
            AlertController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map