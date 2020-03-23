import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
var AppointmentDetailsPage = /** @class */ (function () {
    function AppointmentDetailsPage(navCtrl, alertController, events, database, storage, loadingController, api, auth, payment) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.events = events;
        this.database = database;
        this.storage = storage;
        this.loadingController = loadingController;
        this.api = api;
        this.auth = auth;
        this.payment = payment;
        this.appointment = {
            cliente_nombre: '',
            phone_number: '',
            nationality: '',
            email: '',
            address: '',
            message: '',
            price: '',
            specialty_name: '',
            date: '',
            hour: ''
        };
    }
    AppointmentDetailsPage.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Hellooo'
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.storage.getParams("params").then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var params;
                            var _this = this;
                            return tslib_1.__generator(this, function (_a) {
                                params = JSON.parse(data);
                                this.database.getAppointmentByKey(params.id).subscribe(function (response) {
                                    _this.appointment.cliente_nombre = response.cliente_nombre;
                                    _this.appointment.phone_number = response.phone_number;
                                    _this.appointment.nationality = response.nationality;
                                    _this.appointment.email = response.email;
                                    _this.appointment.address = response.address;
                                    _this.appointment.message = response.message;
                                    _this.appointment.price = response.price;
                                    _this.appointment.specialty_name = response.specialty_name;
                                    _this.appointment.date = response.date;
                                    _this.appointment.hour = response.hour;
                                    loading.dismiss();
                                });
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AppointmentDetailsPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    AppointmentDetailsPage = tslib_1.__decorate([
        Component({
            selector: 'app-appointment-details',
            templateUrl: './appointment-details.page.html',
            styleUrls: ['./appointment-details.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            Events,
            DatabaseService,
            StorageService,
            LoadingController,
            ApiService,
            AuthService,
            PaymentService])
    ], AppointmentDetailsPage);
    return AppointmentDetailsPage;
}());
export { AppointmentDetailsPage };
//# sourceMappingURL=appointment-details.page.js.map