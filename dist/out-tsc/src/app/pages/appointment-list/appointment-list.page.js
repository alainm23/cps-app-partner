import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
var AppointmentListPage = /** @class */ (function () {
    function AppointmentListPage(navCtrl, alertController, events, database, storage, loadingController, api, auth, payment) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.events = events;
        this.database = database;
        this.storage = storage;
        this.loadingController = loadingController;
        this.api = api;
        this.auth = auth;
        this.payment = payment;
    }
    AppointmentListPage.prototype.ngOnInit = function () {
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
                        this.storage.getValue('uid').then(function (uid) {
                            console.log(uid);
                            _this.database.getAppointmentsByUser(uid).subscribe(function (data) {
                                _this.appointments = data;
                                console.log(data);
                                loading.dismiss();
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AppointmentListPage.prototype.ngOnDestroy = function () {
    };
    AppointmentListPage.prototype.goHome = function () {
        this.navCtrl.navigateRoot('home');
    };
    AppointmentListPage.prototype.goAppointmentDetailPage = function (key) {
        this.storage.setParams('params', {
            id: key
        });
        this.navCtrl.navigateForward('appointment-details');
    };
    AppointmentListPage = tslib_1.__decorate([
        Component({
            selector: 'app-appointment-list',
            templateUrl: './appointment-list.page.html',
            styleUrls: ['./appointment-list.page.scss'],
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
    ], AppointmentListPage);
    return AppointmentListPage;
}());
export { AppointmentListPage };
//# sourceMappingURL=appointment-list.page.js.map